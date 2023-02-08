import CardContainer from "../CardContainer";
import "./HomeContent.css";

const HomeContent = ({ data }) => {
  return (
    <div className="home-card-wrapper">
      {data &&
        data
          .slice(0)
          .reverse()
          .map((article, index) => {
            return <CardContainer key={article._id} details={article} />;
          })}
    </div>
  );
};

export default HomeContent;
