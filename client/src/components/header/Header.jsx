import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm"> React & Node</span>
        <span className="headerTitleLg"> Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://www.teahub.io/photos/full/15-152359_beautiful-greenery-of-real-nature-scene-wallpaper-free.jpg"
        alt=""
      />
    </div>
  );
}
