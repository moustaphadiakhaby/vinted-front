import "./Header.css";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <Link to="/">
        <div>
          <img src={logo} alt="" className="header-logo" />
        </div>
      </Link>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
        />
      </div>
      <div>
        <button className="header-button button-signup button-login-signup">
          S'inscrire
        </button>
        <button className="header-button button-login-signup">
          Se connecter
        </button>
      </div>
      <button className="button-sold header-button">Vends tes articles</button>
    </div>
  );
};

export default Header;
