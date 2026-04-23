'use client'
import { useGLTF, Text } from "@react-three/drei"
import { useRef, useEffect, Suspense } from "react"
import * as THREE from "three"

// Ultra-reliable Fontsource CDN links
const FONT_MAP: Record<string, string> = {
  'Bagel Fat One': 'https://cdn.jsdelivr.net/npm/@fontsource/bagel-fat-one/files/bagel-fat-one-latin-400-normal.woff',
  'Black Ops One': 'https://cdn.jsdelivr.net/npm/@fontsource/black-ops-one/files/black-ops-one-latin-400-normal.woff',
  'Bungee Shade': 'https://cdn.jsdelivr.net/npm/@fontsource/bungee-shade/files/bungee-shade-latin-400-normal.woff',
  'Caveat': 'https://cdn.jsdelivr.net/npm/@fontsource/caveat/files/caveat-latin-400-normal.woff',
  'Coustard': 'https://cdn.jsdelivr.net/npm/@fontsource/coustard/files/coustard-latin-400-normal.woff',
  'Great Vibes': 'https://cdn.jsdelivr.net/npm/@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff',
  'Inter': 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff',
  'New Rocker': 'https://cdn.jsdelivr.net/npm/@fontsource/new-rocker/files/new-rocker-latin-400-normal.woff',
  'Oswald': 'https://cdn.jsdelivr.net/npm/@fontsource/oswald/files/oswald-latin-400-normal.woff',
  'Permanent Marker': 'https://cdn.jsdelivr.net/npm/@fontsource/permanent-marker/files/permanent-marker-latin-400-normal.woff',
  'Purple Purse': 'https://cdn.jsdelivr.net/npm/@fontsource/purple-purse/files/purple-purse-latin-400-normal.woff',
  'Send Flowers': 'https://cdn.jsdelivr.net/npm/@fontsource/send-flowers/files/send-flowers-latin-400-normal.woff',
  'Ultra': 'https://cdn.jsdelivr.net/npm/@fontsource/ultra/files/ultra-latin-400-normal.woff',
}

export function BagModel({
  customSettings,
}: {
  customSettings: { color: string; text: string; font: string; textColor: string };
}) {
  const { scene } = useGLTF("/shopping-bag/source/model.glb")
  const meshRef = useRef<THREE.Group>(null)
  const zOffset = 0.28

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.side = THREE.DoubleSide
          const isHandle = child.name.toLowerCase().includes("handle") ||
                          child.name.toLowerCase().includes("strap") ||
                          child.name.toLowerCase().includes("rope")

          if (!isHandle) {
            child.material.color.set(customSettings.color)
          } else {
            child.material.color.set("#1a1a1a")
          }
        }
      })
    }
  }, [scene, customSettings.color])

  // Try to get font, but fallback to Inter (which is the most reliable)
  const fontUrl = FONT_MAP[customSettings.font] || FONT_MAP['Inter']

  return (
    <group ref={meshRef} scale={5}>
      <primitive object={scene} position={[0, 0, 0]} />

      {/* Front Text */}
      <Suspense fallback={<Text position={[0, -0.13, zOffset]} fontSize={0.05} color={customSettings.textColor} anchorX="center" anchorY="middle">Loading...</Text>}>
        <Text
          position={[0, -0.13, zOffset]}
          fontSize={0.08}
          color={customSettings.textColor}
          font={fontUrl}
          anchorX="center"
          anchorY="middle"
          maxWidth={0.5}
          textAlign="center"
          material-toneMapped={false}
          material-polygonOffset={true}
          material-polygonOffsetFactor={-1}
        >
          {customSettings.text}
        </Text>
      </Suspense>

      {/* Back Text */}
      <Suspense fallback={null}>
        <Text
          position={[0, -0.13, -zOffset]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.08}
          color={customSettings.textColor}
          font={fontUrl}
          anchorX="center"
          anchorY="middle"
          maxWidth={0.5}
          textAlign="center"
          material-toneMapped={false}
          material-polygonOffset={true}
          material-polygonOffsetFactor={-1}
        >
          {customSettings.text}
        </Text>
      </Suspense>
    </group>
  )
}

useGLTF.preload("/shopping-bag/source/model.glb")
