import { useState } from "react";
import SignUpInBtn from "../utils/SignUpInBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/sign-in", { email, password })
      .then((response) => {
        response.status === 200 && navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Credentials");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="card shadow-sm p-4"
        style={{ width: "100%", maxWidth: "26rem" }}
      >
        <h3 className="text-center mb-2">Sign In</h3>
        <p className="text-center mb-4">
          New to Our Product? <a href="#">Create an Account</a>
        </p>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="keepSignedIn"
          />
          <label className="form-check-label" htmlFor="keepSignedIn">
            Keep me signed in
          </label>
        </div>

        <div className="d-grid mb-3">
          <button className="btn btn-dark" type="submit">
            Login
          </button>
        </div>

        <div className="text-center mb-3">
          <a href="#" className="text-decoration-none">
            Forgot your password?
          </a>
        </div>

        <hr />

        <p className="text-center">Or sign in using:</p>

        <SignUpInBtn />
      </form>
    </div>
  );
};
export default SignIn;
