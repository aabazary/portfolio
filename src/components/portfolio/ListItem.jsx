/* eslint-disable react/no-unknown-property */
import { motion, useInView, } from "motion/react";
import { FaGithub, FaExternalLinkAlt, FaDownload } from "react-icons/fa";
import { Canvas, useFrame, useLoader} from "@react-three/fiber";
import { Suspense } from "react";
import { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useBreakpoint } from "./useBreakpoint"

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
  const TechIcon3D = ({ src, position, iconSize }) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, src);
  
    useFrame((state) => {
      if (meshRef.current) {
        const angle = THREE.MathUtils.degToRad(30 * Math.sin(state.clock.getElapsedTime()) - 10);
        meshRef.current.rotation.y = angle;
      }
    });
  
    return (
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[iconSize, iconSize]} />
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
    );
  };
  
  
  const TechnologiesCanvas = ({ techs }) => {
    const breakpoint = useBreakpoint();
  
    let iconSize, spacing;
    if (breakpoint === "mobile") {
      iconSize = 4;
      spacing = 5;
    } else if (breakpoint === "tablet") {
      iconSize = 3;
      spacing = 4;
    } else {
      // desktop
      iconSize = 2;
      spacing = 3;
    }
  
    // Compute positions based on spacing
    const positions = techs.map((tech, index) => [
      (index - (techs.length - 1) / 2) * spacing,
      0,
      0,
    ]);
  
    return (
      <div className="tech-canvas-container">
        <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.8} />
          <Suspense fallback={null}>
            {techs.map((tech, index) => (
              <TechIcon3D key={index} src={tech} position={positions[index]} iconSize={iconSize} />
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
                  <motion.a
                    variants={textVariants}
                    href={item.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="icon-button">
                      <FaGithub size={30} />
                    </button>
                  </motion.a>
                )}
                {item.live_link && (
                  <motion.a
                    variants={textVariants}
                    href={item.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
  export default ListItem;