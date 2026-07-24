import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, Box, Cylinder, Text } from "@react-three/drei";

function ServerContainer() {
  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
      <group position={[-4, 1, -5]} rotation={[0.4, 0.6, 0]}>
        <Box args={[1.8, 1.8, 1.8]}>
          <meshBasicMaterial
            color="#22d3ee"
            wireframe
            transparent
            opacity={0.25}
          />
        </Box>
        <Box args={[0.8, 0.8, 0.8]}>
          <meshPhysicalMaterial
            color="#818cf8"
            transmission={0.8}
            roughness={0.2}
          />
        </Box>
      </group>
    </Float>
  );
}

function DatabaseStack() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={[4, -2, -6]} rotation={[0.2, -0.4, 0]}>
        <Cylinder args={[1, 1, 0.6, 32]} position={[0, 0.8, 0]}>
          <meshPhysicalMaterial
            color="#a78bfa"
            transmission={0.9}
            roughness={0.1}
          />
        </Cylinder>
        <Cylinder args={[1, 1, 0.6, 32]} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#a78bfa"
            transmission={0.9}
            roughness={0.1}
          />
        </Cylinder>
        <Cylinder args={[1, 1, 0.6, 32]} position={[0, -0.8, 0]}>
          <meshPhysicalMaterial
            color="#a78bfa"
            transmission={0.9}
            roughness={0.1}
          />
        </Cylinder>
      </group>
    </Float>
  );
}

function FloatingCode() {
  return (
    <>
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <Text
          position={[5, 2, -4]}
          fontSize={1.8}
          color="#22d3ee"
          fillOpacity={0.8}
          rotation={[0, -0.2, 0]}
        >
          {`{ }`}
        </Text>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
        <Text
          position={[-3.5, -2.5, -3]}
          fontSize={1.5}
          color="#818cf8"
          fillOpacity={0.8}
          rotation={[0, 0.4, 0]}
        >
          {`</>`}
        </Text>
      </Float>
    </>
  );
}

export default function Scene() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at 30% 20%, #0c1030 0%, #060918 60%, #020408 100%)",
      }}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.35} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.8}
          color="#a78bfa"
        />
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={3}
          saturation={0}
          fade
          speed={1}
        />
        <ServerContainer />
        <DatabaseStack />
        <FloatingCode />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(6, 9, 24, 0.35)",
        }}
      />
    </div>
  );
}
