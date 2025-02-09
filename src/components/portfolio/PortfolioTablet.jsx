import ListItem from "./ListItem";
import "./portfolio.css";

const PortfolioTablet = ({ items }) => {
  return (
    <div className="portfolio-tablet">
      {items.map((item) => (
        <ListItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default PortfolioTablet;
