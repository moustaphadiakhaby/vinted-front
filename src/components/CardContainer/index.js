import "./CardContainer.css";
import { Link } from "react-router-dom";

const CardContainer = ({ details }) => {
  console.log();

  return (
    <Link to={`/offer/${details._id}`} className="simplelink">
      <div className="card-container">
        <div className="card-avatar-username">
          {details.owner.account.avatar && (
            <img src={details.owner.account.avatar.secure_url} alt="" />
          )}
          <span>{details.owner.account.username}</span>
        </div>
        <div>
          <img src={details.product_image.secure_url} alt="" />
          <div className="card-price-size-brand">
            <span>{details.product_price} €</span>
            <span>{details.product_details[1].TAILLE}</span>
            <span>{details.product_details[0].MARQUE}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardContainer;
