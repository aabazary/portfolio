/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Suspense, useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import "./skills.css";

// ----- Grid Mode (Large Screens) -----
const SkillLogo3D = ({ src, size = .8, position }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, src);
  const iconScale =.85;
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <mesh scale={[iconScale, iconScale, iconScale]} ref={meshRef} position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

const CategorySkillsCanvas = ({ logos }) => {
  const spacing = 2;
  const rowSpacing = 2;
  const maxPerRow = 3;

  const totalRows = Math.ceil(logos.length / maxPerRow); 
  const containerHeight = totalRows * rowSpacing * 1.5 + 300; 

  const positions = logos.map((logo, index) => {
    const row = Math.floor(index / maxPerRow);
    const colInRow = index % maxPerRow;
    const itemsInRow = Math.min(logos.length - row * maxPerRow, maxPerRow);
  
    const centerOffset = (itemsInRow - 1) * spacing * 0.5;
    const x = colInRow * spacing - centerOffset;
    
    const totalRows = Math.ceil(logos.length / maxPerRow);
    const yOffset = (totalRows - 1) * rowSpacing * 0.5; 
    const y = -row * rowSpacing + yOffset; 
  
    return [x, y, 0];
  });
  

  return (
    <div style={{ width: "100%", height: `${containerHeight}px`, display: "flex", justifyContent: "center" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          {logos.map((logo, index) => (
            <SkillLogo3D key={index} src={logo.src} size={2} position={positions[index]} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};


// ----- Mobile Carousel: One Category at a Time (for screens <768px) -----
const MobileSkillsCarouselOne = ({ categories }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [categories.length]);
  
  const variants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };
  
  return (
    <div className="mobile-carousel-container">
      <div className="carousel-wrapper">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={current}
            className="carousel-item"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h2 className="carousel-category-title">{categories[current].title}</h2>
            <div className="carousel-logos single-row">
              {categories[current].logos.map((logo, index) => (
                <div key={index} className="carousel-logo">
                  <img src={logo.src} alt={`Logo ${index}`} />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ----- Mobile Carousel: Two Categories at a Time (for screens 768px–1535px) -----
const MobileSkillsCarouselTwo = ({ categories }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 2) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [categories.length]);
  
  const variants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "0%", opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };
  
  // Display two categories side by side in one row.
  const displayed = [categories[current], categories[(current + 1) % categories.length]];
  
  return (
    <div className="mobile-carousel-container">
      <div className="carousel-wrapper">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={current}
            className="carousel-item two-columns"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {displayed.map((cat, idx) => (
              <div key={idx} className="carousel-item-half">
                <h2 className="carousel-category-title">{cat.title}</h2>
                <div className="carousel-logos single-row">
                  {cat.logos.map((logo, index) => (
                    <div key={index} className="carousel-logo">
                      <img src={logo.src} alt={`Logo ${index}`} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Skills = () => {
  const frontendLogos = [
    { src: "/logos/html5.svg" },
    { src: "/logos/css.svg" },
    { src: "/logos/javascript.svg" },
    { src: "/logos/bootstrap.svg" },
    { src: "/logos/tailwind.svg" },
    { src: "/logos/handlebars.svg" },
    { src: "/logos/react.svg" },
    { src: "/logos/angular.svg" },

  ];
  const backendLogos = [
    { src: "/logos/nodejs.svg" },
    { src: "/logos/express.svg" },
    { src: "/logos/mysql.svg" },
    { src: "/logos/mongodb.svg" },
    { src: "/logos/mongoose.svg" },
    { src: "/logos/java.svg" },
    { src: "/logos/python.svg" },
  ];
  const toolsLogos = [
    { src: "/logos/heroku.svg" },
    { src: "/logos/insomnia.svg" },
    { src: "/logos/postman.svg" },
    { src: "/logos/render.svg" },
    { src: "/logos/chatgpt.svg" },
    { src: "/logos/androidstudio.png" },

  ];
  const versionLogos = [
    { src: "/logos/git.svg" },
    { src: "/logos/github.svg" },
    { src: "/logos/gitlab.svg" },
  ];
  
  const categories = [
    { title: "Frontend", logos: frontendLogos },
    { title: "Backend", logos: backendLogos },
    { title: "Tools & Platforms", logos: toolsLogos },
    { title: "Version Control", logos: versionLogos },
  ];
  
  const [screenType, setScreenType] = useState("grid");
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenType("carouselOne");
      } else if (width >= 768 && width < 1536) {
        setScreenType("carouselTwo");
      } else {
        setScreenType("grid");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  if (screenType === "carouselOne") {
    return <MobileSkillsCarouselOne categories={categories} />;
  } else if (screenType === "carouselTwo") {
    return <MobileSkillsCarouselTwo categories={categories} />;
  } else {
    return (
      <div className="skills-grid">
        {categories.map((cat, index) => (
          <div key={index} className="grid-category">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="grid-category-title"
            >
              {cat.title}
            </motion.h2>
            <CategorySkillsCanvas logos={cat.logos} />
          </div>
        ))}
      </div>
    );
  }
};

export default Skills;
