const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


//Register
router.post("/register", async (req, res) => {
    console.log("I'm inside the register route")
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const user = await newUser.save();
        console.log(`New User: ${user}`)
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }

});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("wrong credentials!");

        //const validated = await bcrypt .compare( req.body.password, user.password );
        //!validated && res.status(400).json("wrong credentials!");


        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);

    }
});
// router.post("/logout", async (req, res) => {
//     console.log('logout')
// });



module.exports = router;