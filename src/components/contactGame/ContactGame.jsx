/* eslint-disable react/no-unknown-property */
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Text } from "@react-three/drei";


const Envelope = ({ onRotation }) => {
  const ref = useRef();
  const { scene } = useGLTF("/envelope3.glb");
  const isDragging = useRef(false);
  const prevPos = useRef({ x: 0, y: 0 });
  const totalYRotation = useRef(0); 
  const spinVelocity = useRef({ x: 0, y: 0 }); 

  const handlePointerDown = (event) => {
    isDragging.current = true;
    prevPos.current = { x: event.clientX, y: event.clientY };
    spinVelocity.current = { x: 0, y: 0 }; 
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (event) => {
    if (isDragging.current && ref.current) {
      const deltaX = (event.clientX - prevPos.current.x) * 0.01; 
      const deltaY = (event.clientY - prevPos.current.y) * 0.01; 

      ref.current.rotation.y += deltaX; 
      ref.current.rotation.x += deltaY; 

      prevPos.current = { x: event.clientX, y: event.clientY };

      // Store velocity for smooth release animation
      spinVelocity.current = { x: deltaX, y: deltaY };

      // Track only horizontal rotation for scoring
      totalYRotation.current += deltaX * (180 / Math.PI); 

      if (Math.abs(totalYRotation.current) >= 360) {
        onRotation();
        totalYRotation.current = 0; 
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, []);

  // Add slight rotation when the page loads
  useFrame(() => {
    if (ref.current) {
      if (!isDragging.current) {
        ref.current.rotation.y += spinVelocity.current.x;
        ref.current.rotation.x += spinVelocity.current.y;

        spinVelocity.current.x *= 0.95;
        spinVelocity.current.y *= 0.95;
      } else {
        ref.current.rotation.y += 0.002;
      }
    }
  });

  return (
    <group ref={ref} onPointerDown={handlePointerDown}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
};

const ContactGame = () => {
  const [rotationCount, setRotationCount] = useState(0);

  return (
    <Canvas camera={{ position: [0, 3, 7] }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

      <Text position={[0, 3, 0]} fontSize={0.6} color="white">
        Score: {rotationCount}
      </Text>

      <Envelope onRotation={() => setRotationCount((prev) => prev + 1)} />
    </Canvas>
  );
};

export default ContactGame;
