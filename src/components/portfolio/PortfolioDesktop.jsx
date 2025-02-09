import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ListItem from "./ListItem";
import "./portfolio.css";

const PortfolioDesktop = ({ items }) => {
  const [containerDistance, setContainerDistance] = useState(0);
  const [progressOpacity, setProgressOpacity] = useState(1);
  const ref = useRef(null);

  // Measure the left offset of the portfolio container
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

  // Use Framer Motion's scroll hook for horizontal translation
  const { scrollYProgress } = useScroll({ target: ref });
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  // Listen to scroll events and adjust progress bar opacity
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        // If the portfolio's bottom is at or below the viewport's bottom,
        // we're still fully in the portfolio; opacity remains 1.
        if (rect.bottom >= window.innerHeight) {
          setProgressOpacity(1);
        } else {
          // When portfolio's bottom moves above the viewport bottom,
          // compute opacity (e.g. linear fade out).
          const opacity = rect.bottom / window.innerHeight;
          setProgressOpacity(opacity);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Call it initially in case the page isn't scrolled to the top.
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <motion.div className="pProgress" style={{ opacity: progressOpacity }}>
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
      </motion.div>
    </div>
  );
};

export default PortfolioDesktop;