import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import tear from "../../img/tear.svg";
import HomeContent from "../../components/HomeContent";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pageCounter, setPageCounter] = useState(1);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${pageCounter}&limit=10`
        );
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [pageCounter]);

  if (!isLoading) {
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
        <div className="footer">
          <button
            onClick={() => {
              if (pageCounter > 0) setPageCounter(pageCounter - 1);
            }}
            className="futbut header-button"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (pageCounter < Math.ceil(data.count / 10))
                setPageCounter(pageCounter + 1);
            }}
            className="futbut header-button"
          >
            Next
          </button>
        </div>
      </div>
    );
  } else {
    return <p>Loading....</p>;
  }
};

export default Home;
