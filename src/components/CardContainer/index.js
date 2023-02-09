import "./CardContainer.css";
import { Link } from "react-router-dom";

const CardContainer = ({ details }) => {
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
            {details.product_details.map((detail, index) => {
              if (detail.TAILLE) {
                return <span key={index}>{detail.TAILLE}</span>;
              } else if (detail.MARQUE) {
                return <span key={index}>{detail.MARQUE}</span>;
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardContainer;
