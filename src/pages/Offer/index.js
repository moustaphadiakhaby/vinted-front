import { useParams } from "react-router-dom";
import "./Offer.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  if (!isLoading) {
    return (
      <div className="offer-body">
        <div className="offer-container">
          <div className="offer-pictures">
            <img
              src={data.product_image.secure_url}
              alt=""
              className="offer-picture"
            />
          </div>

          <div className="offer-infos">
            <div>
              <span className="offer-price">{data.product_price} €</span>
              <ul className="offer-list">
                {data.product_details.map((desc, index) => {
                  return (
                    <li key={index}>
                      <span>{Object.keys(desc)}</span>
                      <span>{Object.values(desc)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="divider"></div>
            <div className="offer-content">
              <p className="name">{data.product_name}</p>
              <p className="description">{data.product_description}</p>
              <div className="offer-avatar-username">
                {data.owner.account.avatar && (
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                )}
                <span>{data.owner.account.username}</span>
              </div>
            </div>
            <button
              onClick={() => {
                navigate("/payment", {
                  state: {
                    title: data.product_name,
                    price: data.product_price,
                    id: id,
                  },
                });
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Offer;
