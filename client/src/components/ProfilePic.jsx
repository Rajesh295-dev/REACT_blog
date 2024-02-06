// import React, { useContext } from "react";

// import { Link } from "react-router-dom";
// import { Context } from "./context/Context";

// export default function ProfilePicture() {
//   const { user } = useContext(Context);
//   const sessionImage = sessionStorage.getItem("newProfilePic") || null;
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

//   if (sessionImage) {
//     console.log("session storage exists");
//     return (
//       <Link to="/settings">
//         {" "}
//         <img className="topImg" src={`${PF}${sessionImage}`} alt="" />{" "}
//       </Link>
//     );
//   } else if (user && !sessionImage) {
//     console.log("user exists but no session storage exists");
//     return (
//       <Link to="/settings">
//         {" "}
//         <img className="topImg" src={`${PF}${user.profilepic}`} alt="" />
//       </Link>
//     );
//   } else {
//     console.log("else");
//     return (
//       <Link to="/settings">
//         {" "}
//         <img className="topImg" src={`${PF}default.png`} alt="" />
//       </Link>
//     );
//   }
// }
