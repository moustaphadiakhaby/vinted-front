import { useParams } from "react-router-dom";
import "./Offer.css";

const Offer = ({ data }) => {
  //   const params = useParams();
  //   console.log(params);

  //   Je récupère le params dans l'URL avec useParams
  const { id } = useParams();
  console.log(id);

  const offer = data.find((elem) => elem._id === id);
  console.log(offer);
  return (
    <div className="offer-body">
      <div className="offer-container">
        <div className="offer-pictures">
          <img
            src={offer.product_image.secure_url}
            alt=""
            className="offer-picture"
          />
        </div>
        <div className="offer-infos">
          <div>
            <span className="offer-price">{offer.product_price} €</span>
            <ul className="offer-list">
              {offer.product_details.map((desc) => {
                console.log(desc);
                return (
                  <li>
                    <span>{Object.keys(desc)}</span>
                    <span>{Object.values(desc)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="divider"></div>
          <div className="offer-content">
            <p className="name">{offer.product_name}</p>
            <p className="description">{offer.product_description}</p>
            <div className="offer-avatar-username">
              {offer.owner.account.avatar && (
                <img src={offer.owner.account.avatar.secure_url} alt="" />
              )}
              <span>{offer.owner.account.username}</span>
            </div>
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
