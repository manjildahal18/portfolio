import React, { useState } from 'react';
import './Stars.css';

// Constellations with points mapped to a 1000x1000 coordinate grid
const CONSTELLATIONS = [
  {
    name: "Ursa Major (Big Dipper)",
    points: [
      { id: "um1", x: 150, y: 150 },
      { id: "um2", x: 220, y: 180 },
      { id: "um3", x: 280, y: 210 },
      { id: "um4", x: 330, y: 260 },
      { id: "um5", x: 320, y: 360 },
      { id: "um6", x: 420, y: 380 },
      { id: "um7", x: 440, y: 290 },
    ],
    connections: [
      ["um1", "um2"],
      ["um2", "um3"],
      ["um3", "um4"],
      ["um4", "um5"],
      ["um5", "um6"],
      ["um6", "um7"],
      ["um7", "um4"],
    ]
  },
  {
    name: "Cassiopeia",
    points: [
      { id: "cas1", x: 750, y: 120 },
      { id: "cas2", x: 790, y: 180 },
      { id: "cas3", x: 840, y: 150 },
      { id: "cas4", x: 880, y: 210 },
      { id: "cas5", x: 940, y: 170 },
    ],
    connections: [
      ["cas1", "cas2"],
      ["cas2", "cas3"],
      ["cas3", "cas4"],
      ["cas4", "cas5"],
    ]
  },
  {
    name: "Orion",
    points: [
      { id: "or1", x: 150, y: 650, label: "Betelgeuse" },
      { id: "or2", x: 270, y: 670, label: "Bellatrix" },
      { id: "or3", x: 190, y: 730 },
      { id: "or4", x: 210, y: 730 },
      { id: "or5", x: 230, y: 730 },
      { id: "or6", x: 160, y: 810 },
      { id: "or7", x: 260, y: 820, label: "Rigel" },
    ],
    connections: [
      ["or1", "or3"],
      ["or2", "or5"],
      ["or3", "or4"],
      ["or4", "or5"],
      ["or3", "or6"],
      ["or5", "or7"],
      ["or1", "or2"],
      ["or6", "or7"],
    ]
  },
  {
    name: "Leo",
    points: [
      { id: "leo1", x: 700, y: 600 },
      { id: "leo2", x: 740, y: 520 },
      { id: "leo3", x: 800, y: 500 },
      { id: "leo4", x: 830, y: 560 },
      { id: "leo5", x: 790, y: 620 },
      { id: "leo6", x: 850, y: 650 },
      { id: "leo7", x: 880, y: 730 },
      { id: "leo8", x: 800, y: 760 },
      { id: "leo9", x: 740, y: 710 },
    ],
    connections: [
      ["leo1", "leo2"],
      ["leo2", "leo3"],
      ["leo3", "leo4"],
      ["leo4", "leo5"],
      ["leo5", "leo1"],
      ["leo5", "leo6"],
      ["leo6", "leo7"],
      ["leo7", "leo8"],
      ["leo8", "leo9"],
      ["leo9", "leo5"],
    ]
  }
];

export default function Stars() {
  const [hoveredConstellation, setHoveredConstellation] = useState(null);

  // Generate random background stars
  const backgroundStars = React.useMemo(() => {
    return Array.from({ length: 180 }).map((_, i) => {
      const size = Math.random() < 0.8 ? 1 : Math.random() < 0.95 ? 2 : 3;
      const type = Math.random() < 0.1 ? 'blue-star' : Math.random() < 0.15 ? 'yellow-star' : 'white-star';
      return (
        <div 
          key={`bg-${i}`} 
          className={`star bg-star ${type}`}
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${3 + Math.random() * 5}s`
          }} 
        />
      );
    });
  }, []);

  return (
    <div className="stars-container">
      {/* Deep Space Nebulae & Atmosphere */}
      <div className="nebula nebula-cyan" />
      <div className="nebula nebula-violet" />
      <div className="nebula nebula-blue" />
      <div className="horizon-glow" />

      {/* Twinkling Background Stars */}
      {backgroundStars}

      {/* Shooting Stars */}
      <div className="shooting-star shooting-star-1" />
      <div className="shooting-star shooting-star-2" />
      <div className="shooting-star shooting-star-3" />

      {/* Constellations SVG Overlay */}
      <svg 
        viewBox="0 0 1000 1000" 
        className="constellations-svg"
        preserveAspectRatio="none"
      >
        {CONSTELLATIONS.map((constellation, cIdx) => {
          const isHovered = hoveredConstellation === constellation.name;
          return (
            <g 
              key={`c-${cIdx}`}
              onMouseEnter={() => setHoveredConstellation(constellation.name)}
              onMouseLeave={() => setHoveredConstellation(null)}
              className={`constellation-group ${isHovered ? 'hovered' : ''}`}
            >
              {/* Connection Lines */}
              {constellation.connections.map(([fromId, toId], lIdx) => {
                const fromPt = constellation.points.find(p => p.id === fromId);
                const toPt = constellation.points.find(p => p.id === toId);
                if (!fromPt || !toPt) return null;
                return (
                  <line
                    key={`line-${lIdx}`}
                    x1={fromPt.x}
                    y1={fromPt.y}
                    x2={toPt.x}
                    y2={toPt.y}
                    className="constellation-line"
                  />
                );
              })}

              {/* Constellation Star Points */}
              {constellation.points.map((pt, pIdx) => (
                <g key={`pt-${pIdx}`} className="constellation-star-group">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={pt.label ? 4.5 : 3}
                    className={`constellation-point ${pt.label ? 'major' : ''}`}
                  />
                  {/* Subtle outer star halo */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={pt.label ? 12 : 8}
                    className="constellation-halo"
                  />
                </g>
              ))}
            </g>
          );
        })}
      </svg>

      {/* Interactive Constellation Label HUD */}
      {hoveredConstellation && (
        <div className="constellation-hud">
          <div className="hud-line-glow" />
          <span className="hud-label font-mono uppercase tracking-widest text-[10px] text-accent/60">Constellation Identified</span>
          <h4 className="hud-title font-sans font-bold text-sm tracking-wide text-foreground">{hoveredConstellation}</h4>
        </div>
      )}
    </div>
  );
}