import ListItem from "./ListItem";
import "./portfolio.css";

const PortfolioMobile = ({ items }) => {
  return (
    <div className="portfolio-mobile">
      {items.map((item) => (
        <section className="pItemMobile" key={item.id}>
          <ListItem item={item} />
        </section>
      ))}
    </div>
  );
};

export default PortfolioMobile;
