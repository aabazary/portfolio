// BackgroundStars.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const Stars = () => {
  const starsRef = useRef();
  const stars = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 100; 
    }
    return positions;
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <group ref={starsRef}>
      <Points positions={stars} stride={3} frustumCulled>
        <PointMaterial size={0.02} color="white" transparent opacity={0.8} />
      </Points>
    </group>
  );
};

const BackgroundStars = () => {
  return (
    <Canvas
      gl={{ antialias: true, outputEncoding: THREE.sRGBEncoding }}
      style={{ background: "black" }}
      camera={{ position: [0, 0, 1] }}
    >
      <Stars />
    </Canvas>
  );
};

export default BackgroundStars;
