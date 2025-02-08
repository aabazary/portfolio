import  { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // or "motion/react"
import ListItem from "./ListItem";
import "./portfolio.css";

const PortfolioDesktop = ({ items }) => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };
    calculateDistance();
    window.addEventListener("resize", calculateDistance);
    return () => window.removeEventListener("resize", calculateDistance);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{ width: window.innerWidth - containerDistance }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      {Array.from({ length: items.length }).map((_, i) => (
        <section key={i} />
      ))}
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default PortfolioDesktop;
