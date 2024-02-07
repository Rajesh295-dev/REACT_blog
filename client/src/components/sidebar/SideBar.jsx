import { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  console.log("yo ho array test", cats);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.all-free-download.com/images/graphiclarge/book_in_grass_605519.jpg"
          alt=""
        />
        <p className="introPara">
          This BLOG application empowers users to effortlessly create, manage,
          and share their unique content in a visually appealing and
          user-friendly environment. With a clean and intuitive interface, users
          can easily navigate through the application, sign up for accounts, and
          log in securely.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>

        {/* <ul className="sidebarList">
          {cats.map((c) => (
            <Link key={`${c.name}`} to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul> */}
        <ul className="sidebarList">
          {Array.isArray(cats) &&
            cats.map((c) => (
              <Link key={`${c.name}`} to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
