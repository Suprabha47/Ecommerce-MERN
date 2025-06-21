import { useState } from "react";
import SignUpInBtn from "../utils/SignUpInBtn";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/sign-up", { email, password })
      .then((response) => {
        response.status === 201
          ? navigate("/sign-in")
          : alert("Invalid Credentials!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded shadow-sm"
        style={{ width: "100%", maxWidth: "30rem" }}
      >
        <h2 className="text-center fw-bold mb-2">Create an Account</h2>
        <p className="text-center text-muted mb-4">
          Have an Account?{" "}
          <a href="#" className="text-primary text-decoration-none">
            Sign In
          </a>
        </p>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control "
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
            id="password"
            className="form-control"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid mb-3">
          <button className="btn btn-dark" type="submit">
            Create Account
          </button>
        </div>

        <p className="text-center text-muted small">
          By creating account, you agree to our{" "}
          <a href="#" className="text-primary">
            Terms of Service
          </a>
        </p>

        <hr className="my-4" />

        <p className="text-center mb-3">Or create an account using:</p>

        <SignUpInBtn />
      </form>
    </div>
  );
};
export default SignUp;
