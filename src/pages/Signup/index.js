import "./Signup.css";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      setMessage("Cet email existe déjà");
      console.log(error.message);
    }
  };

  const token = Cookies.get("token");

  if (token) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="signup-container">
        <h2>S'inscrire</h2>
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
          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </form>
      </div>
    );
  }
};

export default Signup;
