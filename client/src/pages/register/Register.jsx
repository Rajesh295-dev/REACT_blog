import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // const userRef = useRef();
  // const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      console.log("Request Payload:", { username, email, password });

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          username,
          email,
          password,
        }
      );
      console.log("Response from the server:", res.data);

      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username.."
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>

        <div className="passwordInputContainer">
          <input
            type={showPassword ? "text" : "password"}
            className="registerInput"
            placeholder="Enter your Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="passwordToggleIcon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {/* <input
          type="Password"
          className="registerInput"
          placeholder="Enter your Password.."
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
