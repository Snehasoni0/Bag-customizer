'use client'
import dynamic from 'next/dynamic'
import CustomizerUI from './components/CustomizerUI'
import React from 'react'

// Dynamically import BagCanvas to prevent SSR issues
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
  const [textColor, setTextColor] = React.useState('#000000')
  const [text, setText] = React.useState('Your Text')
  const [font, setFont] = React.useState('Inter')

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
        {/* Subtle grid pattern for the workspace */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:30px_30px]" />
        
        <div className="relative z-10 flex flex-col h-full md:flex-row">
          {/* Column 1: Workspace Area - Dark Purple */}
          <div 
            className="relative flex-1 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-white/5"
            style={{ backgroundColor: '#7c3aed' }}
          >
            <BagCanvas customSettings={{ color, text, font, textColor }} />

          </div>

          {/* Column 2: Configuration Area - Floating Panel */}
          <div className="w-full h-1/2 md:h-full md:w-[400px] lg:w-[450px] p-4 bg-[#7c3aed]">
            <div className="w-full h-full bg-white shadow-2xl rounded-3xl overflow-hidden">
              <CustomizerUI 
                color={color} setColor={setColor}
                textColor={textColor} setTextColor={setTextColor}
                text={text} setText={setText}
                font={font} setFont={setFont}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
