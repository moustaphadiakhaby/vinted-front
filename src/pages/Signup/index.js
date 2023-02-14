import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Signup.css";

const Signup = ({ setVisibleSign }) => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState();
  const [preview, setPreview] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", mail);
      formData.append("password", password);
      formData.append("newsletter", check);
      if (picture) {
        formData.append("avatar", picture);
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 1 });

      setVisibleSign(false);
      document.body.style.overflow = "auto";
    } catch (error) {
      setMessage("Cet email existe déjà");
      console.log(error.message);
    }
  };

  const token = Cookies.get("token");

  useEffect(() => {
    if (!picture) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(picture);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [picture]);

  if (token) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="signup-container">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          {!preview && (
            <label htmlFor="file" className="label-file label-signup">
              <span className="input-sign">+</span>
              <span>Ajoute une photo</span>
            </label>
          )}

          {preview && (
            <div className="avatar-box">
              <img className="avatar-pic" src={preview} alt="" />
              <div
                onClick={() => {
                  setPreview(undefined);
                  setPicture(undefined);
                }}
                className="remove-avatar2"
              >
                x
              </div>
            </div>
          )}
          <input
            type="file"
            id="file"
            className="input-file"
            onChange={(e) => {
              setPicture(e.target.files[0]);
            }}
          />
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
