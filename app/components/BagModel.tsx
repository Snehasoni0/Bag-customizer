'use client'
import { useGLTF, Text, Line, Image as ImageDrei } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useRef, useEffect, useCallback, Suspense } from "react"
import * as THREE from "three"
import type { TextField } from "../page"

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

function DashedBorder({ width, height }: { width: number; height: number }) {
  const hw = width / 2;
  const hh = height / 2;
  const points: [number, number, number][] = [
    [-hw, -hh, 0.001],
    [hw, -hh, 0.001],
    [hw, hh, 0.001],
    [-hw, hh, 0.001],
    [-hw, -hh, 0.001],
  ];
  return (
    <Line
      points={points}
      color="white"
      lineWidth={1.5}
      dashed
      dashSize={0.015}
      gapSize={0.01}
    />
  );
}

export function BagModel({
  customSettings,
  activeSide,
  frontFields,
  backFields,
  selectedFieldId,
  onSelectField,
  onUpdateField,
  onDragStart,
  onDragEnd,
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
  frontFields: TextField[];
  backFields: TextField[];
  selectedFieldId: string | null;
  onSelectField: (id: string | null) => void;
  onUpdateField: (id: string, updates: Partial<TextField>) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
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
  const { scene } = useGLTF("/shopping-bag/source/model.glb")
  const meshRef = useRef<THREE.Group>(null)
  const { camera, gl } = useThree()
  const zOffset = 0.28

  const isDraggingRef = useRef(false)
  const dragTypeRef = useRef<'text' | 'logo' | null>(null)
  const dragFieldIdRef = useRef<string | null>(null)
  const dragStartWorldRef = useRef(new THREE.Vector3())
  const dragStartPosRef = useRef({ x: 0, y: 0 })

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

  const getPlaneIntersection = useCallback((clientX: number, clientY: number): THREE.Vector3 | null => {
    const rect = gl.domElement.getBoundingClientRect()
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1
    const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera)

    const sideZ = activeSide === 'front' ? zOffset * 5 : -zOffset * 5
    const planeNormal = activeSide === 'front' ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 0, -1)
    const plane = new THREE.Plane(planeNormal, -sideZ)
    
    const intersection = new THREE.Vector3()
    if (raycaster.ray.intersectPlane(plane, intersection)) {
      return intersection
    }
    return null
  }, [camera, gl, activeSide, zOffset])

  useEffect(() => {
    const canvas = gl.domElement

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return
      
      const point = getPlaneIntersection(e.clientX, e.clientY)
      if (!point) return

      const localX = point.x / 5
      const localY = point.y / 5

      const dx = localX - dragStartWorldRef.current.x / 5
      const dy = localY - dragStartWorldRef.current.y / 5

      const xFactor = activeSide === 'front' ? 1 : -1
      const newX = Math.max(-0.24, Math.min(0.24, dragStartPosRef.current.x + dx * xFactor))
      const newY = Math.max(-0.85, Math.min(0.45, dragStartPosRef.current.y + dy))

      if (dragTypeRef.current === 'text' && dragFieldIdRef.current) {
        onUpdateField(dragFieldIdRef.current, { x: newX, y: newY })
      } else if (dragTypeRef.current === 'logo') {
        const updateLogo = activeSide === 'front' ? onUpdateFrontLogo : onUpdateBackLogo
        updateLogo({ x: newX, y: newY })
      }
    }

    const onPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
        dragFieldIdRef.current = null
        dragTypeRef.current = null
        onDragEnd()
      }
    }

    canvas.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      canvas.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [gl, getPlaneIntersection, onUpdateField, onUpdateFrontLogo, onUpdateBackLogo, onDragEnd, activeSide])

  const handleTextPointerDown = (e: any, field: TextField) => {
    e.stopPropagation()
    onSelectField(field.id)

    isDraggingRef.current = true
    dragTypeRef.current = 'text'
    dragFieldIdRef.current = field.id
    dragStartWorldRef.current.copy(e.point)
    dragStartPosRef.current = { x: field.x, y: field.y }
    onDragStart()
  }

  const handleLogoPointerDown = (e: any, side: 'front' | 'back') => {
    const isFull = side === 'front' ? frontIsFullCover : backIsFullCover;
    if (isFull) return; // Disable dragging in full cover mode

    e.stopPropagation()
    onSelectField(null)

    isDraggingRef.current = true
    dragTypeRef.current = 'logo'
    dragStartWorldRef.current.copy(e.point)
    dragStartPosRef.current = side === 'front' ? { x: frontLogoX, y: frontLogoY } : { x: backLogoX, y: backLogoY }
    onDragStart()
  }

  return (
    <group ref={meshRef} scale={5}>
      <primitive object={scene} position={[0, 0, 0]} />

      {/* Front Elements */}
      <group position={[0, 0, 0]}>
        {frontLogoUrl && (
          <group position={frontIsFullCover ? [0, -0.2, zOffset + 0.001] : [frontLogoX, frontLogoY, zOffset]}>
            <Suspense fallback={null}>
              <ImageDrei
                url={frontLogoUrl}
                scale={frontIsFullCover ? [1.3, 1.4] : [frontLogoSize, frontLogoSize]}
                transparent
                toneMapped={false}
                onPointerDown={(e) => handleLogoPointerDown(e, 'front')}
                onPointerOver={() => { if(!frontIsFullCover) document.body.style.cursor = 'grab' }}
                onPointerOut={() => { document.body.style.cursor = 'auto' }}
              />
            </Suspense>
          </group>
        )}

        {frontFields.map((field) => {
          const fontUrl = FONT_MAP[field.font] || FONT_MAP['Inter']
          const isSelected = field.id === selectedFieldId
          return (
            <group key={field.id} position={[field.x, field.y, zOffset + 0.002]}>
              <Suspense fallback={null}>
                <Text
                  fontSize={field.fontSize}
                  color={field.color}
                  font={fontUrl}
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={field.maxWidth}
                  textAlign="center"
                  material-toneMapped={false}
                  material-polygonOffset={true}
                  material-polygonOffsetFactor={-2}
                  onPointerDown={(e: any) => handleTextPointerDown(e, field)}
                  onPointerOver={() => { document.body.style.cursor = 'grab' }}
                  onPointerOut={() => { document.body.style.cursor = 'auto' }}
                >
                  {field.text || ' '}
                </Text>
              </Suspense>
              {isSelected && <DashedBorder width={field.maxWidth + 0.05} height={field.fontSize + 0.04} />}
            </group>
          )
        })}
      </group>

      {/* Back Elements */}
      <group position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
        {backLogoUrl && (
          <group position={backIsFullCover ? [0, -0.2, zOffset + 0.001] : [backLogoX, backLogoY, zOffset]}>
            <Suspense fallback={null}>
              <ImageDrei
                url={backLogoUrl}
                scale={backIsFullCover ? [1.3, 1.4] : [backLogoSize, backLogoSize]}
                transparent
                toneMapped={false}
                onPointerDown={(e) => handleLogoPointerDown(e, 'back')}
                onPointerOver={() => { if(!backIsFullCover) document.body.style.cursor = 'grab' }}
                onPointerOut={() => { document.body.style.cursor = 'auto' }}
              />
            </Suspense>
          </group>
        )}

        {backFields.map((field) => {
          const fontUrl = FONT_MAP[field.font] || FONT_MAP['Inter']
          const isSelected = field.id === selectedFieldId
          return (
            <group key={field.id} position={[field.x, field.y, zOffset + 0.002]}>
              <Suspense fallback={null}>
                <Text
                  fontSize={field.fontSize}
                  color={field.color}
                  font={fontUrl}
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={field.maxWidth}
                  textAlign="center"
                  material-toneMapped={false}
                  material-polygonOffset={true}
                  material-polygonOffsetFactor={-2}
                  onPointerDown={(e: any) => handleTextPointerDown(e, field)}
                  onPointerOver={() => { document.body.style.cursor = 'grab' }}
                  onPointerOut={() => { document.body.style.cursor = 'auto' }}
                >
                  {field.text || ' '}
                </Text>
              </Suspense>
              {isSelected && <DashedBorder width={field.maxWidth + 0.05} height={field.fontSize + 0.04} />}
            </group>
          )
        })}
      </group>
    </group>
  )
}

useGLTF.preload("/shopping-bag/source/model.glb")
