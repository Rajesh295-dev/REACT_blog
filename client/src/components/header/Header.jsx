import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        alt=""
        src="https://ak-d.tripcdn.com/images/100d1a0000019o98r82BD.jpg"
      />
    </div>
  );
}
