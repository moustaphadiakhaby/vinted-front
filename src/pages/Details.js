import { Link } from "react-router-dom";

const Details = () => {
  return (
    <div>
      <h1>Je suis sur la page Details</h1>
      <Link to="/">
        <div>
          <p>Vers la page Home</p>
        </div>
      </Link>
    </div>
  );
};

export default Details;
