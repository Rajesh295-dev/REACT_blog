const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
//const multer = require("multer");
const path = require("path");
const { clog } = require("./util/clog");


//for localhost 
const PORT = process.env.REACT_APP_PORT || 3007
//console.log("this is the port for backend 🛺", PORT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(
    {
        origin: ["https://react-blog-flax.vercel.app"],
        methods: ["POST, GET"],
        credentials: true
    }
));
app.use(clog);


dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(console.log("Connected to  MongoDB"))
    .catch((err) => console.log(err));




//Serve static images
app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});