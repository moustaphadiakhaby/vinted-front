import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import tear from "../../img/tear.svg";
import HomeContent from "../../components/HomeContent";
import HomeHeader from "../../components/HomeHeader";
import { useNavigate } from "react-router-dom";

const Home = ({ params, publishParams }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pageCounter, setPageCounter] = useState(1);

  const {
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
  } = params;

  let price = "price-asc";

  if (headCheck) {
    price = "price-desc";
  } else {
    price = "price-asc";
  }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${pageCounter}&limit=10&sort=${price}&title=${title}&priceMin=${values[0]}&priceMax=${values[1]}`
        );
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [pageCounter, price, title, values]);

  const navigate = useNavigate();

  return (
    <div className="Home">
      <HomeHeader
        visibleLog={visibleLog}
        setVisibleLog={setVisibleLog}
        visibleSign={visibleSign}
        setVisibleSign={setVisibleSign}
        headCheck={headCheck}
        setHeadCheck={setHeadCheck}
        title={title}
        setTitle={setTitle}
        values={values}
        setValues={setValues}
        publishParams={publishParams}
      />
      <div className="home-hero-bg-img">
        <img src={tear} alt="" className="home-hero-forme" />

        <div>
          <div className="home-hero-ready">
            Prêts à faire du tri dans vos placards ?
            <button
              onClick={() => {
                navigate("/publish");
                publishParams.setPub(true);
              }}
            >
              Commencer à vendre
            </button>
          </div>
        </div>
      </div>
      {!isLoading && <HomeContent data={data.offers} />}
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
};

export default Home;
