import React, { useState, useContext } from "react";
import "./menu.css";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

const Menu = () => {
  const { user, dispatch } = useContext(Context);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(PF);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="sideMenu">
      {!open ? (
        <img
          src="/open.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <img
          src="/close.png"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div className="topCenterMenu" onClick={() => setOpen(false)}>
          <ul className="topListMenu">
            <li className="topListItemMenu">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="topListItemMenu">
              <Link className="link" to="/">
                ABOUT
              </Link>
            </li>
            <li className="topListItemMenu">
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>
            <li className="topListItemMenu">
              <Link className="link" to="/">
                CONTACT
              </Link>
            </li>
            <li className="topListItemMenu" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
