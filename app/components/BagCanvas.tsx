"use client";

import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { BagModel } from "./BagModel";
import * as THREE from "three";
import type { TextField } from "../page";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

function CameraController({ activeSide, isDragging }: { 
  activeSide: 'front' | 'back', 
  isDragging: boolean 
}) {
  const orbitRef = useRef<OrbitControlsImpl>(null);
  const targetZRef = useRef<number | null>(null);

  // Set the target Z in a ref instead of state to avoid cascading render warnings
  useEffect(() => {
    targetZRef.current = activeSide === 'front' ? 20 : -20;
  }, [activeSide]);

  useFrame((state) => {
    if (!orbitRef.current || isDragging || targetZRef.current === null) return;

    const currentZ = state.camera.position.z;
    const targetZ = targetZRef.current;

    if (Math.abs(currentZ - targetZ) > 0.1) {
      state.camera.position.lerp(new THREE.Vector3(0, 0, targetZ), 0.1);
      orbitRef.current.update();
    } else {
      targetZRef.current = null;
    }
  });

  return (
    <OrbitControls 
      ref={orbitRef} 
      enablePan={false} 
      makeDefault 
      enabled={!isDragging} 
      minDistance={10}
      maxDistance={40}
    />
  );
}

export default function BagCanvas({
  customSettings,
  activeSide,
  frontFields,
  backFields,
  selectedFieldId,
  onSelectField,
  onUpdateField,
  frontLogoUrl,
  frontLogoSize,
  frontLogoX,
  frontLogoY,
  frontIsFullCover,
  onUpdateFrontLogo,
  backLogoUrl,
  backLogoSize,
  backLogoX,
  backLogoY,
  backIsFullCover,
  onUpdateBackLogo,
}: {
  customSettings: {
    color: string;
  };
  activeSide: 'front' | 'back';
  setActiveSide: (side: 'front' | 'back') => void;
  frontFields: TextField[];
  backFields: TextField[];
  selectedFieldId: string | null;
  onSelectField: (id: string | null) => void;
  onUpdateField: (id: string, updates: Partial<TextField>) => void;
  frontLogoUrl: string | null;
  frontLogoSize: number;
  frontLogoX: number;
  frontLogoY: number;
  frontIsFullCover: boolean;
  onUpdateFrontLogo: (updates: { x?: number; y?: number; size?: number }) => void;
  backLogoUrl: string | null;
  backLogoSize: number;
  backLogoX: number;
  backLogoY: number;
  backIsFullCover: boolean;
  onUpdateBackLogo: (updates: { x?: number; y?: number; size?: number }) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="w-full h-full bg-black">
      <Canvas
        shadows={false}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onPointerMissed={() => onSelectField(null)}
      >
        <color attach="background" args={["#f1f1f1"]} />
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.6} color="white" groundColor="#f1f1f1" />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, 5, 10]} intensity={1} />
        <directionalLight position={[0, 0, -20]} intensity={2.5} color="white" />{" "}
        <directionalLight position={[0, -20, 0]} intensity={2} color="white" />{" "}
        <pointLight position={[10, -5, -10]} intensity={1.5} />{" "}
        <pointLight position={[-10, -5, -10]} intensity={1.5} />{" "}
        
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={35} />
        <CameraController activeSide={activeSide} isDragging={isDragging} />

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            <BagModel 
              customSettings={customSettings} 
              activeSide={activeSide}
              frontFields={frontFields}
              backFields={backFields}
              selectedFieldId={selectedFieldId}
              onSelectField={onSelectField}
              onUpdateField={onUpdateField}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              
              frontLogoUrl={frontLogoUrl}
              frontLogoSize={frontLogoSize}
              frontLogoX={frontLogoX}
              frontLogoY={frontLogoY}
              frontIsFullCover={frontIsFullCover}
              onUpdateFrontLogo={onUpdateFrontLogo}
              
              backLogoUrl={backLogoUrl}
              backLogoSize={backLogoSize}
              backLogoX={backLogoX}
              backLogoY={backLogoY}
              backIsFullCover={backIsFullCover}
              onUpdateBackLogo={onUpdateBackLogo}
            />
          </group>
          <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={15} blur={2.5} far={6} />
        </Suspense>
      </Canvas>
    </div>
  );
}
