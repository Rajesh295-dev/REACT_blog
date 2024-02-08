import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../components/context/Context";
import "./write.css";
import Category from "../../components/category/Category";

export default function Write() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
      categories: category,
    };

    if (category) {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/categories`, {
          name: category,
        });
        console.log("New category added successfully!");
      } catch (error) {
        console.error("Error adding new category:", error);
      }
    }

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "reactBlog");

        const res = await axios.post(
          process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
          formData
        );

        newPost.photo = res.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    console.log(newPost);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts`,
        newPost
      );
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };

  const handleSelectedData = (categoryData) => {
    //console.log("Selected or new category:", categoryData);
    setCategory(categoryData);
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            placeholder="Title"
            type="text"
            id="Title"
            className="writeInput "
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Share your story...."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <Category onSelectedData={handleSelectedData} />

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
