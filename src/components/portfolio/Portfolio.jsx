/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { FaGithub, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const items = [
  {
    id: 1,
    img: "/NextRpg.jpg",
    title: "Next RPG",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit...",
    github_link: "https://github.com/aabazary/nextRPG",
    live_link: "https://nextrpg.onrender.com",
    technologies: ["/logos/html5.svg", "/logos/css.svg"],
  },
  {
    id: 2,
    img: "/Ascension.jpg",
    title: "Ascension",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit...",
    github_link: "https://github.com/yourrepo/school-system",
    live_link: "https://world-of-ascension.onrender.com/",
    technologies: ["/logos/html5.svg"],
  },
  {
    id: 3,
    img: "/TravelApp.jpg",
    title: "Mobile Android Vacation App",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit...",
    github_link: "https://github.com/aabazary/MobileVacationApp",
    download: "/app-release.apk",
  },
  {
    id: 4,
    img: "/WeatherDashboard.jpg",
    title: "Weather Dashboard",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit...",
    live_link: "https://aabazary.github.io/weather_dashboard/",
    github_link: "https://github.com/aabazary/weather_dashboard",
  },
  {
    id: 5,
    img: "/EmployeeManager.jpg",
    title: "Employee Manager CLI",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit...",
    github_link: "https://github.com/aabazary/employee_tracker",
  },
];

const imgVariants = {
  initial: { x: -500, y: 500, opacity: 0 },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const textVariants = {
  initial: { x: 500, y: 500, opacity: 0 },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.05 },
  },
};

// --- TechnologiesCanvas Component ---
// Renders 3D spinning technology icons scaled 3x larger.
const TechIcon3D = ({ src, position }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, src);
  useFrame((state) => {
    if (meshRef.current) {
      // Oscillate: when sin(t)=1, angle ~ (60-20)=40°; when sin(t)=-1, angle ~ (-60-20)=-80°.
      const angle = THREE.MathUtils.degToRad(60 * Math.sin(state.clock.getElapsedTime()) - 10);
      meshRef.current.rotation.y = angle;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
};

const TechnologiesCanvas = ({ techs }) => {
  const spacing = 3; // Increase spacing since icons are larger.
  const positions = techs.map((tech, index) => [ (index - (techs.length - 1) / 2) * spacing, 0, 0 ]);
  return (
    <div className="tech-canvas-container">
      <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          {techs.map((tech, index) => (
            <TechIcon3D key={index} src={tech} position={positions[index]} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

// --- ListItem Component ---
const ListItem = ({ item }) => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt={item.title} />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        {/* Wrap right-side content in a card */}
        <div className="pCard">
          <motion.h1 variants={textVariants}>{item.title}</motion.h1>
          <motion.p variants={textVariants}>{item.desc}</motion.p>
          {/* Card footer: left for button-group, right for tech icons */}
          <div className="card-footer">
            <div className="button-group">
              {item.github_link && (
                <motion.a variants={textVariants} href={item.github_link} target="_blank" rel="noopener noreferrer">
                  <button className="icon-button">
                    <FaGithub size={30} />
                  </button>
                </motion.a>
              )}
              {item.live_link && (
                <motion.a variants={textVariants} href={item.live_link} target="_blank" rel="noopener noreferrer">
                  <button className="icon-button">
                    <FaExternalLinkAlt size={30} />
                  </button>
                </motion.a>
              )}
              {item.download && (
                <motion.a variants={textVariants} href={item.download} download>
                  <button className="icon-button">
                    <FaDownload size={30} />
                  </button>
                </motion.a>
              )}
            </div>
            {item.technologies && item.technologies.length > 0 && (
              <div className="tech-stack">
                <TechnologiesCanvas techs={item.technologies} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
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
  useEffect(() => {
    const handleScroll = () => {
      const portfolioSection = document.querySelector(".portfolio");
      const progressBar = document.querySelector(".pProgress");
  
      if (portfolioSection && progressBar) {
        const rect = portfolioSection.getBoundingClientRect();
        if (rect.bottom < window.innerHeight) {
          progressBar.classList.add("hidden");
        } else {
          progressBar.classList.remove("hidden");
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        <div className="empty" style={{ width: window.innerWidth - containerDistance }} />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      {/* Generate empty sections dynamically for snap-scrolling */}
      {Array.from({ length: items.length }).map((_, i) => (
        <section key={i} />
      ))}
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="#000" strokeWidth={20} />
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

export default Portfolio;
