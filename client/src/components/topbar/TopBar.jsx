import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./topbar.css";
import Menu from "../Menu/Menu";

//import ProfilePicture from "../ProfilePic";
export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(PF);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={user ? "top withGap" : "top"}>
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>

      <div className="topRight">
        {
          /* Conditional Render for Profile Pic */
          user ? (
            <Link to="/settings">
              <img className="topImg" src={user.profilePic} alt="" />
            </Link>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>

              <li className="topListItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          )
        }
        <i className="topSearchIcon fas fa-search"></i>
        <div className="mediumSize">
          <Menu />
        </div>
      </div>
    </div>
  );
}
