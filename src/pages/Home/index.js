import "./Home.css";

import tear from "../../img/tear.svg";
import HomeContent from "../../components/HomeContent";

const Home = ({ data }) => {
  return (
    <div className="Home">
      <div className="home-hero-bg-img">
        <img src={tear} alt="" className="home-hero-forme" />

        <div>
          <div className="home-hero-ready">
            Prêts à faire du tri dans vos placards ?
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <HomeContent data={data.offers} />
    </div>
  );
};

export default Home;
