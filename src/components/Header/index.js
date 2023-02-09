import "./Header.css";
import logo from "../../img/logo.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Header = ({ visibleLog, setVisibleLog, visibleSign, setVisibleSign }) => {
  const [activeToken, setActiveToken] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setActiveToken(true);
    } else {
      setActiveToken(false);
    }
  }, [token]);

  return (
    <div className="header-container">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} alt="" className="header-logo" />
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
        />
      </div>
      {activeToken ? (
        <div>
          <button
            onClick={() => {
              Cookies.remove("token");
              navigate("/");
            }}
            className="button-logout"
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setVisibleSign(!visibleSign);

              document.body.style.overflow = "hidden";
            }}
            className="header-button button-signup button-login-signup"
          >
            S'inscrire
          </button>

          <button
            onClick={() => {
              setVisibleLog(!visibleLog);

              document.body.style.overflow = "hidden";
            }}
            className="header-button button-login-signup"
          >
            Se connecter
          </button>
        </div>
      )}
      <button className="button-sold header-button">Vends tes articles</button>
    </div>
  );
};

export default Header;
