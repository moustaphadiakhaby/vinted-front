import CardContainer from "../CardContainer";
import "./HomeContent.css";

const HomeContent = ({ data }) => {
  return (
    <div className="home-card-wrapper">
      {data &&
        data.map((article, index) => {
          return <CardContainer key={article._id} details={article} />;
        })}
    </div>
  );
};

export default HomeContent;
