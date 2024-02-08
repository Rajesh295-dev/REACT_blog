

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");



//LOGIN

router.post("/login", async (req, res) => {
    console.log("Request login Body:", req.body);
    const inputPassword = req.body.password;

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            console.log("User not found");
            res.status(400).json("Wrong credentials!");
            return;
        }

        const storedHashedPassword = user.password;
        console.log("stored hashed password:", user.password);

        // Use bcrypt.compare to compare the plain text password with the stored hashed password
        bcrypt.compare(inputPassword, storedHashedPassword, (err, result) => {
            if (err) {
                console.error("Error during password validation:", err);
                res.status(500).json("Internal Server Error");
                return;
            }

            if (!result) {
                console.log("Invalid password");
                res.status(400).json("Wrong credentials!");
                return;
            }

            const { password, ...others } = user._doc;
            console.log("Login successful");
            res.status(200).json(others);
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json("Internal Server Error");
    }

});




//REGISTER
// router.post("/register", async (req, res) => {
//     console.log("Request Body:", req.body);
//     try {
//         // Extract input data from req.body
//         const { username, email, password } = req.body;

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPass = await bcrypt.hash(password, salt);

//         // Create a new User instance with hashed password
//         const newUser = new User({
//             username: username,
//             email: email,
//             password: hashedPass,
//         });

//         // Save the new user to the database
//         const user = await newUser.save();
//         //console.log("Stored Hashed Password:", user.password);

//         // Respond with the registered user data
//         res.status(200).json(user);
//     } catch (err) {
//         // Handle errors
//         console.error("Error during registration:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
//REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;