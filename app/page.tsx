'use client'
import dynamic from 'next/dynamic'
import CustomizerUI from './components/CustomizerUI'
import React from 'react'

export interface TextField {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  font: string;
  fontSize: number;
  maxWidth: number;
}

const BagCanvas = dynamic(() => import('./components/BagCanvas'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-zinc-50/50">
      <div className="text-xs font-bold tracking-widest uppercase opacity-20 animate-pulse">
        Loading model...
      </div>
    </div>
  )
})

export default function Home() {
  const [color, setColor] = React.useState('#ffffff')
  const [activeSide, setActiveSide] = React.useState<'front' | 'back'>('front')

  // Multi-Text State
  const [frontFields, setFrontFields] = React.useState<TextField[]>([])
  const [backFields, setBackFields] = React.useState<TextField[]>([])
  const [selectedFieldId, setSelectedFieldId] = React.useState<string | null>(null)

  // Logo State - Front
  const [frontLogoUrl, setFrontLogoUrl] = React.useState<string | null>(null)
  const [frontLogoSize, setFrontLogoSize] = React.useState(0.2)
  const [frontLogoX, setFrontLogoX] = React.useState(0)
  const [frontLogoY, setFrontLogoY] = React.useState(0.15)
  const [frontIsFullCover, setFrontIsFullCover] = React.useState(false)

  // Logo State - Back
  const [backLogoUrl, setBackLogoUrl] = React.useState<string | null>(null)
  const [backLogoSize, setBackLogoSize] = React.useState(0.2)
  const [backLogoX, setBackLogoX] = React.useState(0)
  const [backLogoY, setBackLogoY] = React.useState(0.15)
  const [backIsFullCover, setBackIsFullCover] = React.useState(false)

  const addField = (side: 'front' | 'back') => {
    const newField: TextField = {
      id: crypto.randomUUID(),
      text: 'New Text',
      x: 0,
      y: 0,
      color: '#000000',
      font: 'Inter',
      fontSize: 0.08,
      maxWidth: 0.5,
    }
    if (side === 'front') {
      setFrontFields(prev => [...prev, newField])
    } else {
      setBackFields(prev => [...prev, newField])
    }
    setSelectedFieldId(newField.id)
  }

  const updateField = (side: 'front' | 'back', id: string, updates: Partial<TextField>) => {
    if (side === 'front') {
      setFrontFields(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
    } else {
      setBackFields(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
    }
  }

  const deleteField = (side: 'front' | 'back', id: string) => {
    if (side === 'front') {
      setFrontFields(prev => prev.filter(f => f.id !== id))
    } else {
      setBackFields(prev => prev.filter(f => f.id !== id))
    }
    if (selectedFieldId === id) setSelectedFieldId(null)
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden bg-black">
      {/* Top Text Section */}
      <div className="flex flex-col items-center justify-center min-h-[80px] text-center">
        <h1 className="text-4xl font-light tracking-tighter sm:text-6xl text-white/90">
          BAG <span className="font-bold text-accent">CUSTOMIZER</span>
        </h1>
      </div>

      {/* Main Workspace Area */}
      <main className="relative flex-1 mx-4 mb-4 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:30px_30px]" />
        
        <div className="relative z-10 flex flex-col h-full md:flex-row">
          {/* Column 1: Workspace Area */}
          <div className="relative flex-1 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-white/5 bg-black">
            <BagCanvas 
              activeSide={activeSide}
              setActiveSide={setActiveSide}
              frontFields={frontFields}
              backFields={backFields}
              selectedFieldId={selectedFieldId}
              onSelectField={setSelectedFieldId}
              onUpdateField={(id, updates) => updateField(activeSide, id, updates)}
              
              frontLogoUrl={frontLogoUrl}
              frontLogoSize={frontLogoSize}
              frontLogoX={frontLogoX}
              frontLogoY={frontLogoY}
              frontIsFullCover={frontIsFullCover}
              onUpdateFrontLogo={(updates) => {
                if (updates.x !== undefined) setFrontLogoX(updates.x)
                if (updates.y !== undefined) setFrontLogoY(updates.y)
                if (updates.size !== undefined) setFrontLogoSize(updates.size)
              }}

              backLogoUrl={backLogoUrl}
              backLogoSize={backLogoSize}
              backLogoX={backLogoX}
              backLogoY={backLogoY}
              backIsFullCover={backIsFullCover}
              onUpdateBackLogo={(updates) => {
                if (updates.x !== undefined) setBackLogoX(updates.x)
                if (updates.y !== undefined) setBackLogoY(updates.y)
                if (updates.size !== undefined) setBackLogoSize(updates.size)
              }}

              customSettings={{
                color,
              }} />
          </div>

          {/* Column 2: Configuration Area */}
          <div className="w-full h-1/2 md:h-full md:w-[400px] lg:w-[450px] bg-black">
            <div className="w-full h-full overflow-hidden">
              <CustomizerUI 
                color={color} setColor={setColor}
                activeSide={activeSide} setActiveSide={setActiveSide}
                
                frontFields={frontFields}
                backFields={backFields}
                selectedFieldId={selectedFieldId}
                setSelectedFieldId={setSelectedFieldId}
                onAddField={(side) => addField(side)}
                onUpdateField={(side, id, updates) => updateField(side, id, updates)}
                onDeleteField={(side, id) => deleteField(side, id)}
                
                frontLogoUrl={frontLogoUrl}
                setFrontLogoUrl={setFrontLogoUrl}
                frontLogoSize={frontLogoSize}
                setFrontLogoSize={setFrontLogoSize}
                frontIsFullCover={frontIsFullCover}
                setFrontIsFullCover={setFrontIsFullCover}

                backLogoUrl={backLogoUrl}
                setBackLogoUrl={setBackLogoUrl}
                backLogoSize={backLogoSize}
                setBackLogoSize={setBackLogoSize}
                backIsFullCover={backIsFullCover}
                setBackIsFullCover={setBackIsFullCover}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
