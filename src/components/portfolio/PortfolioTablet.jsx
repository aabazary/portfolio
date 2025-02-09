// PortfolioTablet.jsx
import ListItem from "./ListItem";
import "./portfolio.css";

const PortfolioTablet = ({ items }) => {
  return (
    <div className="portfolio-tablet">
      {items.map((item) => (
        <section className="pItemTablet" key={item.id}>
          <ListItem item={item} />
        </section>
      ))}
    </div>
  );
};

export default PortfolioTablet;
