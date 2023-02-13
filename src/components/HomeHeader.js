import logo from "../img/logo.png";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import SuperSimple from "./Slider";
import loupe from "../img/loupe.svg";
import { useNavigate } from "react-router-dom";

const HomeHeader = ({
  visibleLog,
  setVisibleLog,
  visibleSign,
  setVisibleSign,
  headCheck,
  setHeadCheck,
  title,
  setTitle,
  values,
  setValues,
  publishParams,
}) => {
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

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="header-container">
      <div onClick={refreshPage}>
        <img src={logo} alt="" className="header-logo" />
      </div>

      <div className="search-container">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="search-input"
          placeholder="Recherche des articles"
        />
        <img
          className="svg-inline--fa fa-search fa-w-16 search-input-icon"
          src={loupe}
          alt=""
        />
        <div className="searchbar-bot">
          <span style={{ marginRight: "10px" }}>Trier par prix :</span>
          <span className="checkbox">
            <div
              onClick={() => {
                setHeadCheck(!headCheck);
              }}
              className="wrapper"
            >
              <div style={{ left: headCheck && "24px" }} className="knob">
                <span>{headCheck ? "⇣" : "⇡"}</span>
              </div>
            </div>
          </span>
          <span style={{ marginRight: "10px" }}>Prix entre :</span>

          <SuperSimple values={values} setValues={setValues} />
        </div>
      </div>
      {activeToken ? (
        <div>
          <button
            onClick={() => {
              Cookies.remove("token");
              setActiveToken(false);
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
      <button
        className="button-sold header-button"
        onClick={() => {
          navigate("/publish");
          publishParams.setPub(true);
          console.log(publishParams.pub);
        }}
      >
        Vends tes articles
      </button>
    </div>
  );
};

export default HomeHeader;
