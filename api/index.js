const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const { clog } = require("./util/clog");


const PORT = 3001
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clog);


dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(console.log("Connected to  MongoDB"))
    .catch((err) => console.log(err));






//Serve static images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        // we're going to send this from the front end
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
// handle picture upload
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File has been uploaded successfully!!");
    } catch (error) {
        console.log("could not upload!🧐", error);
        res.status(500).json("Upload failed");
    }
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});