import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import "./ModalSignup.css";

const ModalSignup = ({ setVisibleSign }) => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const account = {
        username: username,
        email: mail,
        password: password,
        newsletter: check,
      };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        account
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 1 });
      console.log(response.data.token);
      setVisibleSign(false);
      document.body.style.overflow = "auto";
    } catch (error) {
      setMessage("Cet email existe déjà");
      console.log(error.message);
    }
  };

  return (
    <div
      onClick={() => {
        setVisibleSign(false);
        document.body.style.overflow = "auto";
      }}
      className="modal-root"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="signup-container modal-signup"
      >
        <h2>S'inscrire</h2>
        <button
          className="exit"
          onClick={() => {
            setVisibleSign(false);
            document.body.style.overflow = "auto";
          }}
        >
          X
        </button>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder="Nom d'utilisateur"
            type="text"
          />
          <input
            onChange={(e) => {
              setMail(e.target.value);
            }}
            value={mail}
            placeholder="Email"
            type="email"
          />
          {message && (
            <span className="signup-login-error-message">{message}</span>
          )}
          <input
            onChange={(e) => {
              console.log(e.target.value);
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Mot de passe"
            type="password"
          />
          <div className="checkbox-container">
            <div>
              <input
                onChange={() => {
                  setCheck(!check);
                }}
                checked={check}
                type="checkbox"
              />
              <span>S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="submit">S'inscrire</button>
          <Link
            to="/login"
            onClick={() => {
              setVisibleSign(false);
            }}
          >
            Tu as déjà un compte ? Connecte-toi !
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ModalSignup;
