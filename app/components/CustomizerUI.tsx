"use client";

import React from "react";
import type { TextField } from "../page";

interface CustomizerUIProps {
  color: string;
  setColor: (color: string) => void;
  activeSide: 'front' | 'back';
  setActiveSide: (side: 'front' | 'back') => void;
  frontFields: TextField[];
  backFields: TextField[];
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
  onAddField: (side: 'front' | 'back') => void;
  onUpdateField: (side: 'front' | 'back', id: string, updates: Partial<TextField>) => void;
  onDeleteField: (side: 'front' | 'back', id: string) => void;
  frontLogoUrl: string | null;
  setFrontLogoUrl: (url: string | null) => void;
  frontLogoSize: number;
  setFrontLogoSize: (size: number) => void;
  frontIsFullCover: boolean;
  setFrontIsFullCover: (val: boolean) => void;
  backLogoUrl: string | null;
  setBackLogoUrl: (url: string | null) => void;
  backLogoSize: number;
  setBackLogoSize: (size: number) => void;
  backIsFullCover: boolean;
  setBackIsFullCover: (val: boolean) => void;
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
  { name: 'Bagel Fat One', value: 'Bagel Fat One' },
  { name: 'Black Ops One', value: 'Black Ops One' },
  { name: 'Bungee Shade', value: 'Bungee Shade' },
  { name: 'Caveat', value: 'Caveat' },
  { name: 'Coustard', value: 'Coustard' },
  { name: 'Great Vibes', value: 'Great Vibes' },
  { name: 'Inter', value: 'Inter' },
  { name: 'New Rocker', value: 'New Rocker' },
  { name: 'Oswald', value: 'Oswald' },
  { name: 'Permanent Marker', value: 'Permanent Marker' },
  { name: 'Purple Purse', value: 'Purple Purse' },
  { name: 'Send Flowers', value: 'Send Flowers' },
  { name: 'Ultra', value: 'Ultra' },
];

export default function CustomizerUI({
  color,
  setColor,
  activeSide,
  setActiveSide,
  frontFields,
  backFields,
  selectedFieldId,
  setSelectedFieldId,
  onAddField,
  onUpdateField,
  onDeleteField,
  frontLogoUrl,
  setFrontLogoUrl,
  frontLogoSize,
  setFrontLogoSize,
  frontIsFullCover,
  setFrontIsFullCover,
  backLogoUrl,
  setBackLogoUrl,
  backLogoSize,
  setBackLogoSize,
  backIsFullCover,
  setBackIsFullCover,
}: CustomizerUIProps) {

  const fields = activeSide === 'front' ? frontFields : backFields;
  const selectedField = fields.find(f => f.id === selectedFieldId) || null;
  const logoUrl = activeSide === 'front' ? frontLogoUrl : backLogoUrl;
  const setLogoUrl = activeSide === 'front' ? setFrontLogoUrl : setBackLogoUrl;
  const logoSize = activeSide === 'front' ? frontLogoSize : backLogoSize;
  const setLogoSize = activeSide === 'front' ? setFrontLogoSize : setBackLogoSize;
  const isFullCover = activeSide === 'front' ? frontIsFullCover : backIsFullCover;
  const setIsFullCover = activeSide === 'front' ? setFrontIsFullCover : setBackIsFullCover;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  return (
    <div 
      className="flex flex-col h-full overflow-y-auto"
      style={{ padding: '30px', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-white">Customize Your Bag</h2>
      </div>

      <hr className="border-white/10 my-4" />

      {/* Bag Color Selection */}
      <div className="mb-6">
        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mb-4 block">
          Bag Color
        </label>
        <div className="flex flex-wrap gap-3 items-center">
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 ${
                color === c.value ? 'ring-2 ring-offset-4 ring-offset-transparent ring-white scale-110' : 'ring-1 ring-white/20'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
          <label
            className="relative w-10 h-10 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}
            title="Pick custom color"
          >
            <span className="text-white text-lg drop-shadow-md">+</span>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <hr className="border-white/10 my-2" />

      {/* Front / Back Tab Switcher */}
      <div className="mb-5 mt-2">
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          <button
            onClick={() => setActiveSide('front')}
            className={`flex-1 py-3 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
              activeSide === 'front'
                ? 'bg-white text-black'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
            }`}
          >
             Front Side
          </button>
          <button
            onClick={() => setActiveSide('back')}
            className={`flex-1 py-3 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 border-l border-white/10 ${
              activeSide === 'back'
                ? 'bg-white text-black'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
            }`}
          >
             Back Side
          </button>
        </div>
      </div>

      {/* Side-specific Customization */}
      <div key={activeSide} className="animate-in fade-in duration-500">
        {/* Logo Upload Section */}
        <div className="mb-8 border border-white/10 rounded-2xl p-4 bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
              Logo Image ({activeSide})
            </label>
            {logoUrl && (
              <button
                onClick={() => setLogoUrl(null)}
                className="text-[10px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 transition-all"
              >
                Remove
              </button>
            )}
          </div>

          {!logoUrl ? (
            <label className="flex flex-col items-center justify-center py-6 border border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/40 mb-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span className="text-white/40 text-xs font-medium">Upload Image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
          ) : (
            <div className="space-y-4">
              {/* Full Cover Mode Commented Out for now
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 bg-black/40 flex items-center justify-center p-1">
                    <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Full Cover Mode</span>
                </div>
                <button 
                  onClick={() => setIsFullCover(!isFullCover)}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${isFullCover ? 'bg-white' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${isFullCover ? 'left-7 bg-black' : 'left-1 bg-white/40'}`} />
                </button>
              </div> 
              */}

              <div className="pt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 bg-black/40 flex items-center justify-center p-1">
                      <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Logo Settings</span>
                  </div>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-2">Logo Size</p>
                    <input
                    type="range"
                    min="0.05"
                    max="0.5"
                    step="0.01"
                    value={logoSize}
                    onChange={(e) => setLogoSize(parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, white ${((logoSize - 0.05) / 0.45) * 100}%, rgba(255,255,255,0.15) ${((logoSize - 0.05) / 0.45) * 100}%)`,
                    }}
                  />
                  <p className="text-white/25 text-[10px] mt-3 text-center">Drag logo on the bag to reposition</p>
                </div>
            </div>
          )}
        </div>

        <hr className="border-white/10 mb-6" />

        {/* Text Fields List + Add Button */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
              Text Fields ({activeSide})
            </label>
            <button
              onClick={() => onAddField(activeSide)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-lg bg-white text-black hover:bg-white/90 transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Text
            </button>
          </div>

          {fields.length === 0 && (
            <div className="text-center py-6 border border-dashed border-white/15 rounded-xl">
              <p className="text-white/30 text-xs">No text fields yet</p>
              <p className="text-white/20 text-[10px] mt-1">Click &quot;+ Add Text&quot; to start</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {fields.map((field, index) => (
              <button
                key={field.id}
                onClick={() => setSelectedFieldId(field.id === selectedFieldId ? null : field.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                  field.id === selectedFieldId
                    ? 'border-white bg-white/10'
                    : 'border-white/10 hover:border-white/25 hover:bg-white/5'
                }`}
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-white/20" 
                  style={{ backgroundColor: field.color }}
                />
                <span className="text-white text-xs truncate flex-1" style={{ fontFamily: field.font }}>
                  {field.text || 'Empty'}
                </span>
                <span className="text-white/30 text-[10px]">#{index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Field Editor */}
        {selectedField && (
          <div className="border border-white/10 rounded-2xl p-4 mb-5 bg-white/5">
            <div className="flex items-center justify-between mb-4">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                Edit Field
              </label>
              <button
                onClick={() => onDeleteField(activeSide, selectedField.id)}
                className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Delete
              </button>
            </div>

            {/* Text Input */}
            <div className="mb-4">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-1.5 block">Label</label>
              <input
                type="text"
                value={selectedField.text}
                onChange={(e) => onUpdateField(activeSide, selectedField.id, { text: e.target.value })}
                placeholder="Enter text..."
                className="w-full px-4 py-2.5 text-sm transition-all border outline-none bg-white/10 border-white/15 rounded-xl focus:border-white/40 focus:ring-1 focus:ring-white/30 text-white placeholder:text-white/30"
              />
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">Size</label>
                <span className="text-[10px] font-mono text-white/50">{Math.round((selectedField.fontSize || 0.08) * 1000)}%</span>
              </div>
              <input
                type="range"
                min="0.03"
                max="0.2"
                step="0.005"
                value={selectedField.fontSize || 0.08}
                onChange={(e) => onUpdateField(activeSide, selectedField.id, { fontSize: parseFloat(e.target.value) })}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white ${((((selectedField.fontSize || 0.08) - 0.03) / 0.17) * 100)}%, rgba(255,255,255,0.15) ${((((selectedField.fontSize || 0.08) - 0.03) / 0.17) * 100)}%)`,
                }}
              />
            </div>

            {/* Width */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">Width</label>
                <span className="text-[10px] font-mono text-white/50">{Math.round((selectedField.maxWidth || 0.5) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="1.0"
                step="0.01"
                value={selectedField.maxWidth || 0.5}
                onChange={(e) => onUpdateField(activeSide, selectedField.id, { maxWidth: parseFloat(e.target.value) })}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white ${((((selectedField.maxWidth || 0.5) - 0.15) / 0.85) * 100)}%, rgba(255,255,255,0.15) ${((((selectedField.maxWidth || 0.5) - 0.15) / 0.85) * 100)}%)`,
                }}
              />
            </div>

            {/* Text Color */}
            <div className="mb-4">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">Color</label>
              <div className="flex flex-wrap gap-2 items-center">
                {COLORS.slice(0, 8).map((c) => (
                  <button
                    key={c.value}
                    onClick={() => onUpdateField(activeSide, selectedField.id, { color: c.value })}
                    className={`w-7 h-7 rounded-full transition-all duration-300 transform hover:scale-110 ${
                      selectedField.color === c.value ? 'ring-2 ring-offset-2 ring-offset-transparent ring-white scale-110' : 'ring-1 ring-white/20'
                    }`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
                <label
                  className="relative w-7 h-7 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                  style={{ background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)' }}
                >
                  <span className="text-white text-xs drop-shadow-md">+</span>
                  <input
                    type="color"
                    value={selectedField.color}
                    onChange={(e) => onUpdateField(activeSide, selectedField.id, { color: e.target.value })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Font Selection */}
            <div>
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">Font</label>
              <div className="grid grid-cols-3 gap-2">
                {FONTS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => onUpdateField(activeSide, selectedField.id, { font: f.value })}
                    className={`flex flex-col items-center justify-center p-2 transition-all border rounded-lg hover:border-white/40 ${
                      selectedField.font === f.value ? 'border-white ring-1 ring-white bg-white/10' : 'border-white/10'
                    }`}
                  >
                    <div className="text-lg mb-0.5 text-white" style={{ fontFamily: f.name }}>Aa</div>
                    <span className="text-[7px] font-medium text-white/40 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center" style={{ fontFamily: f.name }}>
                      {f.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-white/25 text-[10px] mt-3 text-center">Drag text on the bag to reposition</p>
          </div>
        )}
      </div>
    </div>
  )
}
