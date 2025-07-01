import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../utils/userstorage.js";
import "../../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the full-page reload
    setError(""); // clear prior errors

    try {
      const user = loginUser(username, password);
      console.log("Logged in as", user);
      navigate("/dashboard");
    } catch (err) {
    }
  };
  return (
    <section className="auth">
      <section className="auth__container">
        <div className="auth__container__header">
          <img
            className="auth__container__header__image"
            src="/plane_icon.svg"
            alt="jet log logo"
          />
          <h1 className="auth__container__header__title">Jet Log</h1>
        </div>
        <section className="auth__container__login">
          <h1 className="auth__container__login__text">Login</h1>
          <form
            className="auth__container__login__form"
            onSubmit={handleSubmit}
          >
            <input
              className="auth__container__login__form__input"
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <input
              className="auth__container__login__form__input"
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <input
              className="auth__container__login__form__submit"
              type="submit"
              value="Login"
            />
            <p className="auth__container__login__form__register-button">
              <Link to="/auth/register">
                Don’t have an account yet? Register now
              </Link>
            </p>
          </form>
        </section>
      </section>
    </section>
  );
};

export default Login;
