import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

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
      console.log(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setMessage("Mauvais email et/ou mot de passe");
    }
  };

  const token = Cookies.get("token");
  console.log(token);

  if (token) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="signup-container">
        <h2>Se connecter</h2>
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
          <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
        </form>
      </div>
    );
  }
};
export default Login;
