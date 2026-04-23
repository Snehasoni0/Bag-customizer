"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";
import { BagModel } from "./BagModel";

export default function BagCanvas({
  customSettings,
}: {
  customSettings: { color: string; text: string; font: string; textColor: string };
}) {
  return (
    <div className="w-full h-full bg-[#7c3aed]">
      <Canvas
        shadows={false}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#7c3aed"]} />
        {/* Comprehensive Studio Lighting */}
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.6} color="white" groundColor="#7c3aed" />
        {/* Key Lights (Front) */}
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, 5, 10]} intensity={1} />
        {/* Ultra-Back & Bottom Fill Lights */}
        <directionalLight
          position={[0, 0, -20]}
          intensity={2.5}
          color="white"
        />{" "}
        {/* Direct Back */}
        <directionalLight
          position={[0, -20, 0]}
          intensity={2}
          color="white"
        />{" "}
        {/* Direct Bottom */}
        <pointLight position={[10, -5, -10]} intensity={1.5} />{" "}
        {/* Corner Fill */}
        <pointLight position={[-10, -5, -10]} intensity={1.5} />{" "}
        {/* Corner Fill */}
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={35} />
        <OrbitControls enablePan={false} makeDefault />
        <Suspense fallback={null}>
          {/* True centering */}
          <group position={[0, 0, 0]}>
            <BagModel customSettings={customSettings} />
          </group>

          <ContactShadows
            position={[0, -5, 0]}
            opacity={0.4}
            scale={15}
            blur={2.5}
            far={6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
