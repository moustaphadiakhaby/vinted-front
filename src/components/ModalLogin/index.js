import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import("./ModalLogin.css");

const ModalLogin = ({ setVisibleLog }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const account = {
        email: mail,
        password: password,
      };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        account
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 1 });
      setVisibleLog(false);
      document.body.style.overflow = "auto";
    } catch (error) {
      console.log(error.message);
      setMessage("Mauvais email et/ou mot de passe");
    }
  };

  return (
    <div
      onClick={() => {
        setVisibleLog(false);
        document.body.style.overflow = "auto";
      }}
      className="modal-root"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="signup-container modal-login"
      >
        <h2>Se connecter</h2>
        <button
          className="exit"
          onClick={() => {
            setVisibleLog(false);
            document.body.style.overflow = "auto";
          }}
        >
          X
        </button>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            onChange={(e) => {
              setMail(e.target.value);
            }}
            value={mail}
            placeholder="Adresse email"
            type="email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Mot de passe"
            type="password"
          />
          {message && (
            <span className="signup-login-error-message">{message}</span>
          )}
          <button type="submit">Se connecter</button>
          <Link
            onClick={() => {
              setVisibleLog(false);
            }}
            to="/signup"
          >
            Pas encore de compte ? Inscris-toi !
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
