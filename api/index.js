const express = require("express");
const cors = require("cors");
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


const PORT = 3007
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(clog);


dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(console.log("Connected to  MongoDB"))
    .catch((err) => console.log(err));






// //Serve static images
app.use("/images", express.static(path.join(__dirname, "public/images")));

// // Set up multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//         // we're going to send this from the front end
//         cb(null, req.body.name);
//     },
// });

// const upload = multer({ storage: storage });
// // handle picture upload
// app.post("/api/upload", upload.single("file"), (req, res) => {
//     try {
//         return res.status(200).json("File has been uploaded successfully!!");
//     } catch (error) {
//         console.log("could not upload!🧐", error);
//         res.status(500).json("Upload failed");
//     }
// });


const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: `${process.env.REACT_APP_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});



// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "reactBlog",
        // folder: `${process.env.CLOUDINARY_FOLDER_NAME} `, // Optional: folder to store the images in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Optional: allowed image formats
        resource_type: 'auto' // Optional: specify the type of resource to upload ('auto', 'image', 'raw')
    }
});

// Set up multer middleware
const upload = multer({ storage: storage });


// Handle file upload route
app.post('/upload', upload.single('file'), async (req, res) => {

    // If using Cloudinary, the file is already uploaded and the image URL is available in req.file.path
    res.status(200).json({ imageUrl: req.file.path });
});




app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});