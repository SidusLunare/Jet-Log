import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../../utils/userstorage.js";
import "../../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = registerUser(username, password);
    console.log("Registered!", user);
    // you might auto-log them in:
    localStorage.setItem("planeSpotCurrentUser", JSON.stringify(user.id));
    navigate("/dashboard");
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
        <section className="auth__container__register">
          <h1 className="auth__container__register__text">Register</h1>
          <form
            className="auth__container__register__form"
            onSubmit={handleSubmit}
          >
            <input
              className="auth__container__register__form__input"
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <input
              className="auth__container__register__form__input"
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={8}
            />
            <input
              className="auth__container__register__form__input"
              type="password"
              placeholder="Repeat password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              autoComplete="new-password"
              pattern={password}
            />
            <input
              className="auth__container__register__form__submit"
              type="submit"
              value="Register"
            />
            <p
              className="auth__container__register__form__login-button"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Already registered? Login here.
            </p>
          </form>
        </section>
      </section>
    </section>
  );
};

export default Register;
