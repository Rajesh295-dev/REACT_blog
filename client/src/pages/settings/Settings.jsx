import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../components/context/Context";
import SideBar from "../../components/sidebar/SideBar";
import "./settings.css";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  /*
  //old lines of codes
  //this codes are here
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "username" && value.length > 0) setUsername(value);
    if (name === "password" && value.length > 0) setPassword(value);
    if (name === "email" && value.length > 0) setEmail(value);
  };




 //this codes are for images
  {sessionStorage.getItem("newProfilePic") ? (
              <img
                className=""
                src={`${PF}${sessionStorage.getItem("newProfilePic")}`}
                alt=""
              />
            ) : (
              <img className="" src={`${PF}${user.profilepic}`} alt="" />
            )}


 //this codes are for validation
   if (updatedUser.username === "") {
      console.log("no username, the current username is ", user.username);
      sessionStorage.setItem("username", user.username);
      setUsername(user.username);
    }
    if (updatedUser.email === "") {
      console.log("no email, the current email is ", user.email);
      sessionStorage.setItem("email", user.email);
      setUsername(user.username);
    }
    if (updatedUser.password === "") {
      console.log("no password, the current password is ", user.password);
      sessionStorage.setItem("password", user.password);
      setUsername(user.username);
    }
 */

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "reactBlog");

        const res = await axios.post(
          process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
          formData
        );
        // console.log("test", res.data.secure_url);
        updatedUser.profilePic = res.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/ ` + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
            />

            {/* {file && (
              <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )} */}

            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept=".png, .jpeg, .jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
