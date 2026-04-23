"use client";

import React from "react";

interface CustomizerUIProps {
  color: string;
  setColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  text: string;
  setText: (text: string) => void;
  font: string;
  setFont: (font: string) => void;
}

const COLORS = [
  { name: "Pure White", value: "#ffffff" },
  { name: "Sleek Black", value: "#1a1a1a" },
  { name: "Royal Purple", value: "#7c3aed" },
  { name: "Dusty Rose", value: "#fb7185" },
  { name: "Ocean Blue", value: "#3b82f6" },
  { name: "Forest Green", value: "#22c55e" },
  { name: "Sand Beige", value: "#f5f5dc" },
  { name: "Terracotta", value: "#c2410c" },
  { name: "Midnight Navy", value: "#1e3a8a" },
  { name: "Sage Green", value: "#86efac" },
  { name: "Soft Lavender", value: "#e9d5ff" },
  { name: "Golden Oak", value: "#d97706" },
  { name: "Crimson Red", value: "#dc2626" },
  { name: "Teal Dream", value: "#0d9488" },
];

const FONTS = [
  { name: 'Bagel Fat One', value: 'Bagel Fat One', url: 'https://fonts.gstatic.com/s/bagelfatone/v1/rax_HiS6_926G0Z0S8eIn1oE0XFh.woff' },
  { name: 'Black Ops One', value: 'Black Ops One', url: 'https://fonts.gstatic.com/s/blackopsone/v20/qWjcB6-9R1sV6S689I1U5ySop9O9.woff' },
  { name: 'Bungee Shade', value: 'Bungee Shade', url: 'https://fonts.gstatic.com/s/bungeeshade/v12/v8m627bb6yX_iS9e2Z3T3W3K.woff' },
  { name: 'Caveat', value: 'Caveat', url: 'https://fonts.gstatic.com/s/caveat/v18/Wnzp6H_p6f4-rg6_Z6Y.woff' },
  { name: 'Coustard', value: 'Coustard', url: 'https://fonts.gstatic.com/s/coustard/v18/34E2mP_m9Wp6f4-rg6_Z.woff' },
  { name: 'Great Vibes', value: 'Great Vibes', url: 'https://fonts.gstatic.com/s/greatvibes/v15/RWm0oL_p6f4-rg6_Z6Y.woff' },
  { name: 'Inter', value: 'Inter', url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.woff' },
  { name: 'New Rocker', value: 'New Rocker', url: 'https://fonts.gstatic.com/s/newrocker/v18/Wnzp6H_p6f4-rg6_Z6Y.woff' },
  { name: 'Oswald', value: 'Oswald', url: 'https://fonts.gstatic.com/s/oswald/v49/TK3iW6_p6f4-rg6_Z6Y.woff' },
  { name: 'Permanent Marker', value: 'Permanent Marker', url: 'https://fonts.gstatic.com/s/permanentmarker/v16/F1jV6H_p6f4-rg6_Z6Y.woff' },
  { name: 'Purple Purse', value: 'Purple Purse', url: 'https://fonts.gstatic.com/s/purplepurse/v22/Wnzp6H_p6f4-rg6_Z6Y.woff' },
  { name: 'Send Flowers', value: 'Send Flowers', url: 'https://fonts.gstatic.com/s/sendflowers/v6/Wnzp6H_p6f4-rg6_Z6Y.woff' },
  { name: 'Ultra', value: 'Ultra', url: 'https://fonts.gstatic.com/s/ultra/v18/Wnzp6H_p6f4-rg6_Z6Y.woff' },
];

export default function CustomizerUI({
  color,
  setColor,
  textColor,
  setTextColor,
  text,
  setText,
  font,
  setFont,
}: CustomizerUIProps) {
  return (
    <div 
      className="flex flex-col h-full overflow-y-auto bg-white"
      style={{ padding: '30px' }}
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-zinc-900">Customize Your Bag</h2>
      </div>

      <hr className="border-zinc-100 my-4" />

      {/* Bag Color Selection */}
      <div className="mb-6">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4 block">
          Bag Color
        </label>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 ${
                color === c.value ? 'ring-2 ring-offset-4 ring-purple-500 scale-110' : 'ring-1 ring-black/5'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Text Color Selection */}
      <div className="mb-6">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4 block">
          Text Color
        </label>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => setTextColor(c.value)}
              className={`w-8 h-8 rounded-full transition-all duration-300 transform hover:scale-110 ${
                textColor === c.value ? 'ring-2 ring-offset-4 ring-purple-500 scale-110' : 'ring-1 ring-black/5'
              }`}
              style={{ backgroundColor: c.value }}
              title={`Text ${c.name}`}
            />
          ))}
        </div>
      </div>

      {/* Text Input */}
      <div className="mb-6">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2 block">
          Custom Label
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="w-full px-4 py-3 text-sm transition-all border outline-none bg-zinc-50 border-zinc-200 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-black"
        />
      </div>

      {/* Font Selection - Grid View */}
      <div className="mb-8">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4 block">
          Pick a Font
        </label>
        <div className="grid grid-cols-3 gap-3">
          {FONTS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFont(f.value)}
              className={`flex flex-col items-center justify-center p-3 transition-all border rounded-xl hover:border-purple-300 ${
                font === f.value ? 'border-black ring-1 ring-black' : 'border-zinc-100'
              }`}
            >
              <div 
                className="text-2xl mb-1 text-black" 
                style={{ fontFamily: f.name }}
              >
                Aa
              </div>
              <span 
                className="text-[8px] font-medium text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis w-full"
                style={{ fontFamily: f.name }}
              >
                {f.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
