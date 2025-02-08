import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";

const Envelope = ({ onRotation }) => {
  const ref = useRef();
  const { scene } = useGLTF("/envelope3.glb"); // Load the 3D model
  const isDragging = useRef(false);
  const prevPos = useRef({ x: 0, y: 0 });
  const totalYRotation = useRef(0); // Tracks horizontal rotation for score
  const spinVelocity = useRef({ x: 0, y: 0 }); // Momentum tracking

  const handlePointerDown = (event) => {
    isDragging.current = true;
    prevPos.current = { x: event.clientX, y: event.clientY };
    spinVelocity.current = { x: 0, y: 0 }; // Reset momentum when grabbing
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (event) => {
    if (isDragging.current && ref.current) {
      const deltaX = (event.clientX - prevPos.current.x) * 0.01; // Sensitivity for Y rotation
      const deltaY = (event.clientY - prevPos.current.y) * 0.01; // Sensitivity for X rotation

      ref.current.rotation.y += deltaX; // Horizontal rotation
      ref.current.rotation.x += deltaY; // Vertical rotation

      prevPos.current = { x: event.clientX, y: event.clientY };

      // Store velocity for smooth release animation
      spinVelocity.current = { x: deltaX, y: deltaY };

      // Track only horizontal rotation for scoring
      totalYRotation.current += deltaX * (180 / Math.PI); // Convert to degrees

      if (Math.abs(totalYRotation.current) >= 360) {
        onRotation();
        totalYRotation.current = 0; // Reset after counting a full rotation
      }
    }
  };

  useEffect(() => {
    // Add global listeners for smooth dragging experience
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
        // Apply momentum effect on release
        ref.current.rotation.y += spinVelocity.current.x;
        ref.current.rotation.x += spinVelocity.current.y;

        // Reduce momentum gradually (friction effect)
        spinVelocity.current.x *= 0.95;
        spinVelocity.current.y *= 0.95;
      } else {
        // Subtle idle rotation if not moving
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

      {/* Fixed Score Display */}
      <Text position={[0, 3, 0]} fontSize={0.6} color="white">
        Score: {rotationCount}
      </Text>

      <Envelope onRotation={() => setRotationCount((prev) => prev + 1)} />
    </Canvas>
  );
};

export default ContactGame;
