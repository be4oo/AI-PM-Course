import React, { useState } from "react";
import { curriculum } from "../data/curriculum";

/**
 * KnowledgeGraphView component using SVG to visualize the curriculum.
 */
export function KnowledgeGraphView({ onNavigate, onBack }) {
  const [hovered, setHovered] = useState(null);

  // Constants for layout
  const width = 800;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const moduleRadius = 180;
  const lessonRadius = 60;

  // Pre-calculate module positions in a circle
  const moduleCount = curriculum.length;
  const modules = curriculum.map((m, i) => {
    const angle = (i / moduleCount) * Math.PI * 2 - Math.PI / 2;
    return {
      ...m,
      x: centerX + Math.cos(angle) * moduleRadius,
      y: centerY + Math.sin(angle) * moduleRadius,
      index: i
    };
  });

  return (
    <div className="app-container" style={{ background: '#05070A' }}>
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-badge" style={{ background: "#00E676", color: "#002A12" }}>GRAPH</span>
          <span className="brand-title">Curriculum Constellation</span>
        </div>
        <button className="btn-outline" onClick={onBack}>← BACK</button>
      </header>

      <div className="content-area" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg 
            viewBox={`0 0 ${width} ${height}`} 
            style={{ width: '100%', maxHeight: '80vh', filter: 'drop-shadow(0 0 20px rgba(0,230,118,0.1))' }}
        >
          {/* Central Hub */}
          <circle cx={centerX} cy={centerY} r={40} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" />
          <text 
            x={centerX} y={centerY} 
            textAnchor="middle" dy=".3em" 
            style={{ fill: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 2, fontFamily: 'var(--font-mono)' }}
          >
            CORE
          </text>

          {/* Lines from center to modules */}
          {modules.map((m) => (
            <line 
                key={`line-${m.id}`} 
                x1={centerX} y1={centerY} 
                x2={m.x} y2={m.y} 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="1" 
            />
          ))}

          {/* Lessons orbiting modules */}
          {modules.map((m) => {
            const lessons = m.lessons;
            return lessons.map((l, li) => {
              const startAngle = (m.index / moduleCount) * Math.PI * 2 - Math.PI / 2;
              const angle = startAngle + ((li - (lessons.length - 1) / 2) * 0.4);
              const lx = m.x + Math.cos(angle) * lessonRadius;
              const ly = m.y + Math.sin(angle) * lessonRadius;
              
              const isHovered = hovered === l.id;

              return (
                <g 
                    key={l.id} 
                    cursor="pointer" 
                    onMouseEnter={() => setHovered(l.id)} 
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onNavigate(m.index, li)}
                >
                  <line x1={m.x} y1={m.y} x2={lx} y2={ly} stroke={m.accent} strokeOpacity={0.2} />
                  <circle 
                    cx={lx} cy={ly} 
                    r={isHovered ? 8 : 4} 
                    fill={isHovered ? m.accent : 'rgba(255,255,255,0.2)'} 
                    style={{ transition: 'all 0.2s ease', stroke: isHovered ? '#fff' : 'none', strokeWidth: 2 }}
                  />
                  {isHovered && (
                    <g>
                        <rect x={lx + 12} y={ly - 15} width={180} height={40} rx={4} fill="rgba(0,0,0,0.8)" style={{ backdropFilter: 'blur(4px)' }} />
                        <text x={lx + 22} y={ly + 5} style={{ fill: '#fff', fontSize: 11, fontWeight: 600 }}>{l.title}</text>
                        <text x={lx + 22} y={ly + 18} style={{ fill: m.accent, fontSize: 9, fontWeight: 700 }}>LESSON {l.id}</text>
                    </g>
                  )}
                </g>
              );
            });
          })}

          {/* Module Hubs */}
          {modules.map((m) => (
            <g key={m.id}>
              <circle 
                cx={m.x} cy={m.y} r={m.accent === hovered ? 18 : 14} 
                fill="#05070A" stroke={m.accent} strokeWidth="3" 
                style={{ transition: 'all 0.3s ease' }}
              />
              <text 
                x={m.x} y={m.y} textAnchor="middle" dy=".3em" 
                style={{ fill: m.accent, fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)' }}
              >
                M{m.id}
              </text>
            </g>
          ))}
        </svg>

        <div style={{ position: 'absolute', bottom: 40, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: 1 }}>SELECT A NODE TO NAVIGATE</div>
        </div>
      </div>
    </div>
  );
}
