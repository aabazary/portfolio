/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as THREE from "three";
import "./home.css";

// ----- Supernova Component -----
const Supernova = ({ targetY, targetScale }) => {
  const { scene } = useGLTF("/supernova.glb");
  const supernovaRef = useRef();

  useEffect(() => {
    scene.scale.set(0.1, 0.1, 0.1);
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.envMapIntensity = 0.8;
        child.material.needsUpdate = true;
      }
    });
    scene.position.y = targetY;
  }, [scene, targetY]);

  useFrame(() => {
    scene.position.y = THREE.MathUtils.lerp(scene.position.y, targetY, 0.1);
    const currentScale = scene.scale;
    const target = new THREE.Vector3(targetScale, targetScale, targetScale);
    
    currentScale.lerp(target, 0.01);
    scene.rotation.y += 0.05 * 0.016;
  });

  return <primitive ref={supernovaRef} object={scene} />;
};

// ----- Animated Text (Letter-by-Letter) -----
const letterVariant = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const AnimatedText = ({ text, className, controls }) => {
  return (
    <motion.div
      className={className}
      variants={containerVariant}
      initial="hidden"
      animate={controls}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariant}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ----- Scroll Indicator Variant -----
const scrollVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      },
      opacity: { duration: 1 },
    },
  },
};

// ----- Hero Component -----
const Home = () => {

  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });
  const headerControls = useAnimation();
  const scrollControls = useAnimation();

  useEffect(() => {
    if (inView) {
      headerControls.start("visible");
      scrollControls.start("visible");
    } else {
      headerControls.start("hidden");
      scrollControls.start("hidden");
    }
  }, [inView, headerControls, scrollControls]);

  const targetY = inView ? 0 : -20;
  const targetScale = inView ? 1 : 0.1;

  return (
    <div className="hero" ref={ref}>
      <div className="hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 5] }}
          gl={{ outputEncoding: THREE.sRGBEncoding, toneMappingExposure: 1.0 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <directionalLight position={[0, 10, 0]} intensity={1} />
            <Supernova targetY={targetY} targetScale={targetScale} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      {/* Header Text near the top (adjusted via CSS) */}
      <div className="hero-text">
        <AnimatedText text="Akon Abazary" className="heroName" controls={headerControls} />
        <AnimatedText
          text="Full Stack Developer"
          className="heroSubtitle"
          controls={headerControls}
        />
      </div>
      {/* Scroll Indicator on the same line */}
      <div className="hero-scroll">
        <motion.div
          className="scrollLine"
          variants={scrollVariant}
          initial="hidden"
          animate={scrollControls}
        >
          <span className="scrollArrow">↓</span>
          <span className="scrollLabel">Scroll to Explore</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
