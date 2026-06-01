import { useState, useRef, useEffect, useCallback, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { Sparkles, Grid3X3, RefreshCw, Compass, Sliders, CheckCircle2 } from 'lucide-react';

interface Vector2D {
  x: number;
  y: number;
}

interface SkillNode {
  name: string;
  coords: Vector2D;
  color: string;
  description: string;
}

export default function MathSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 320, height: 320 });
  
  // Draggable vectors (in range -10 to 10)
  // u represents the "User Search Query"
  // v represents the "Active Context Weight"
  const [u, setU] = useState<Vector2D>({ x: 5, y: 6 });
  const [v, setV] = useState<Vector2D>({ x: -4, y: 7 });
  const [activeDrag, setActiveDrag] = useState<'u' | 'v' | null>(null);

  // Vishal's Skill Nodes in 2D Semantic Feature Space
  const SKILL_NODES: SkillNode[] = [
    { 
      name: "Deep LLM Agents", 
      coords: { x: 3, y: 8 }, 
      color: "#a78bfa", // Purple Accent
      description: "Prompt tuning, LangChain flows, and RAG pipelines"
    },
    { 
      name: "Node.js & Express", 
      coords: { x: 8, y: -2 }, 
      color: "#34d399", // Emerald Accent
      description: "High-performance REST/GraphQL servers and API gateways"
    },
    { 
      name: "React & Tailwinds (80%)", 
      coords: { x: -7, y: 4 }, 
      color: "#60a5fa", // Blue Accent
      description: "Interactive dashboard interfaces, responsive frontends & Tailwind CSS styling"
    },
    { 
      name: "AWS & Serverless Architecture", 
      coords: { x: -4, y: -7 }, 
      color: "#f59e0b", // Amber Accent
      description: "Cloud Lambdas, Docker container deploys, CI/CD"
    }
  ];

  // Monitor container size dynamically using standard ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setDimensions({
          width: width,
          height: Math.min(width, 420),
        });
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Center coordinate mapping calculations
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const scale = Math.min(dimensions.width, dimensions.height) / 22; // bounds of -11 to 11

  // Map theoretical grid coords to SVG pixel coords
  const toPixels = useCallback((vec: Vector2D) => {
    return {
      x: centerX + vec.x * scale,
      y: centerY - vec.y * scale, // invert Y for standard mathematical coordinates
    };
  }, [centerX, centerY, scale]);

  // Map SVG pixel coords back to theoretical grid coords
  const toTheoretical = useCallback((px: number, py: number) => {
    const rawX = (px - centerX) / scale;
    const rawY = (centerY - py) / scale;
    return {
      x: Math.min(10, Math.max(-10, Math.round(rawX * 2) / 2)),
      y: Math.min(10, Math.max(-10, Math.round(rawY * 2) / 2)),
    };
  }, [centerX, centerY, scale]);

  // Handle drag-and-drop triggers
  const handleMouseDown = (target: 'u' | 'v') => (e: ReactMouseEvent) => {
    e.preventDefault();
    setActiveDrag(target);
  };

  const handleTouchStart = (target: 'u' | 'v') => (e: ReactTouchEvent) => {
    setActiveDrag(target);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!activeDrag || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const theoreticalCoords = toTheoretical(mouseX, mouseY);
    if (activeDrag === 'u') {
      setU(theoreticalCoords);
    } else {
      setV(theoreticalCoords);
    }
  }, [activeDrag, toTheoretical]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!activeDrag || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    
    const theoreticalCoords = toTheoretical(mouseX, mouseY);
    if (activeDrag === 'u') {
      setU(theoreticalCoords);
    } else {
      setV(theoreticalCoords);
    }
  }, [activeDrag, toTheoretical]);

  const handleMouseUp = useCallback(() => {
    setActiveDrag(null);
  }, []);

  useEffect(() => {
    if (activeDrag) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [activeDrag, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Math Helper: Calculate Cosine Similarity between vector A and vector B
  // Cos(theta) = (A . B) / (||A|| * ||B||)
  const getCosineSimilarity = (a: Vector2D, b: Vector2D) => {
    const dot = a.x * b.x + a.y * b.y;
    const magA = Math.sqrt(a.x * a.x + a.y * a.y);
    const magB = Math.sqrt(b.x * b.x + b.y * b.y);
    if (magA === 0 || magB === 0) return 0;
    return dot / (magA * magB);
  };

  // Preset prompts that map directly to semantic weights
  const selectQueryPreset = (keyword: 'agentic' | 'backend' | 'frontend' | 'cloud') => {
    if (keyword === 'agentic') {
      setU({ x: 2, y: 9 });
      setV({ x: 4, y: 7 });
    } else if (keyword === 'backend') {
      setU({ x: 9, y: -1 });
      setV({ x: 7, y: -3 });
    } else if (keyword === 'frontend') {
      setU({ x: -8, y: 5 });
      setV({ x: -6, y: 3 });
    } else if (keyword === 'cloud') {
      setU({ x: -3, y: -8 });
      setV({ x: -5, y: -6 });
    }
  };

  // Measurements for user interaction logs
  const dotProductUV = u.x * v.x + u.y * v.y;
  const simUV = getCosineSimilarity(u, v);

  // Compute Cosine match with Vishal's actual skill points
  const skillMatches = SKILL_NODES.map(skill => {
    const similarity = getCosineSimilarity(u, skill.coords);
    // Convert -1 to 1 similarity score into a user-friendly percentage (0-100%)
    const pct = Math.max(0, Math.round(((similarity + 1) / 2) * 100));
    return {
      ...skill,
      matchPercentage: pct,
      similarity
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  const pU = toPixels(u);
  const pV = toPixels(v);

  return (
    <section id="sandbox" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32 lg:scroll-mt-24" aria-label="Interactive embedding simulator">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.05)] w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" />
          <span className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent font-extrabold font-mono">
            Vector Simulator
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold tracking-tight text-white">Vector & Semantic Proximity Simulator</h3>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          In Large Language Models, text phrases are converted to high-dimensional <strong>Vector Embeddings</strong>. Proximity matches are found using <strong>Cosine Similarity</strong>. 
          Use this interactive coordinate board to visualize how Vishal Kumar's skills intersect your requirements:
        </p>

        {/* Dynamic Skill Matching Meter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          {skillMatches.map((skill, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/40 border border-zinc-900 rounded-lg p-3.5 flex flex-col justify-between"
              style={{ borderLeftColor: skill.color, borderLeftWidth: '3px' }}
            >
              <div>
                <dt className="text-xs font-bold text-white mb-1 line-clamp-1">{skill.name}</dt>
                <dd className="text-[10px] text-zinc-500 leading-normal line-clamp-2 md:h-8 mb-2">
                  {skill.description}
                </dd>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-zinc-500">Cosine Proximity:</span>
                  <span style={{ color: skill.color }} className="font-bold">{skill.matchPercentage}%</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-350"
                    style={{ 
                      width: `${skill.matchPercentage}%`,
                      backgroundColor: skill.color 
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Query Inputs */}
        <div className="flex flex-col gap-2.5 mb-6">
          <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            Simulate Search Prompts (Set vectors: Drag handles on canvas or pick preset):
          </span>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => selectQueryPreset('agentic')}
              className="text-xs font-mono font-medium rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-300 hover:border-indigo-500/50 hover:text-white px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-indigo-400 animate-spin-slow" />
              "Autonomous Agent flows, LangChain"
            </button>
            <button
              onClick={() => selectQueryPreset('backend')}
              className="text-xs font-mono font-medium rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-300 hover:border-emerald-500/50 hover:text-white px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin-slow" />
              "High performance Express rest backend"
            </button>
            <button
              onClick={() => selectQueryPreset('frontend')}
              className="text-xs font-mono font-medium rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-300 hover:border-blue-500/50 hover:text-white px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-blue-400" />
              "Build responsive web interfaces"
            </button>
            <button
              onClick={() => selectQueryPreset('cloud')}
              className="text-xs font-mono font-medium rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-300 hover:border-amber-500/50 hover:text-white px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 text-amber-400" />
              "Deploy scalable AWS configurations"
            </button>
          </div>
        </div>

        {/* 2D Interactive Grid Arena */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div ref={containerRef} className="md:col-span-3 relative bg-zinc-900/30 rounded-xl border border-zinc-900 p-1 flex items-center justify-center overflow-hidden h-[340px] md:h-[400px]">
            <svg
              width={dimensions.width}
              height={dimensions.height}
              className="select-none overflow-hidden"
              style={{ cursor: activeDrag ? 'grabbing' : 'default' }}
            >
              <defs>
                <pattern id="sandbox-grid" width={scale} height={scale} patternUnits="userSpaceOnUse">
                  <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke="rgba(63, 63, 70, 0.1)" strokeWidth="1" />
                </pattern>
                <marker id="arrow-query" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
                </marker>
                <marker id="arrow-weight" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fb7185" />
                </marker>
              </defs>

              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#sandbox-grid)" />

              {/* Semantic Space Clusters/Zones (Circles around skill points) */}
              {SKILL_NODES.map((skill, index) => {
                const pixelLoc = toPixels(skill.coords);
                return (
                  <g key={index}>
                    <circle 
                      cx={pixelLoc.x} 
                      cy={pixelLoc.y} 
                      r={scale * 2.2} 
                      fill={skill.color} 
                      opacity="0.05"
                    />
                    <circle 
                      cx={pixelLoc.x} 
                      cy={pixelLoc.y} 
                      r="5" 
                      fill={skill.color} 
                    />
                    <text 
                      x={pixelLoc.x} 
                      y={pixelLoc.y - 10} 
                      textAnchor="middle" 
                      className="text-[9px] font-mono font-extrabold shadow-sm"
                      fill={skill.color}
                    >
                      {skill.name}
                    </text>
                  </g>
                );
              })}

              {/* Axis lines */}
              <line x1={0} y1={centerY} x2={dimensions.width} y2={centerY} stroke="rgba(113, 113, 122, 0.2)" strokeWidth="1.5" />
              <line x1={centerX} y1={0} x2={centerX} y2={dimensions.height} stroke="rgba(113, 113, 122, 0.2)" strokeWidth="1.5" />

              {/* Draggable Search Query Vector (Indigo) */}
              <line
                x1={centerX}
                y1={centerY}
                x2={pU.x}
                y2={pU.y}
                stroke="#818cf8"
                strokeWidth="3"
                markerEnd="url(#arrow-query)"
              />

              {/* Draggable Context Weight Vector (Rose) */}
              <line
                x1={centerX}
                y1={centerY}
                x2={pV.x}
                y2={pV.y}
                stroke="#fb7185"
                strokeWidth="2.5"
                strokeDasharray="1 1"
                markerEnd="url(#arrow-weight)"
              />

              {/* Drag handles (Nodes with elegant rings) */}
              {/* Query Node */}
              <circle
                cx={pU.x}
                cy={pU.y}
                r="10"
                fill="#818cf8"
                stroke="#ffffff"
                strokeWidth="2"
                className="cursor-pointer hover:scale-110 transition-transform active:cursor-grabbing"
                onMouseDown={handleMouseDown('u')}
                onTouchStart={handleTouchStart('u')}
              />

              {/* Context Node */}
              <circle
                cx={pV.x}
                cy={pV.y}
                r="8"
                fill="#fb7185"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="cursor-pointer hover:scale-110 transition-transform active:cursor-grabbing"
                onMouseDown={handleMouseDown('v')}
                onTouchStart={handleTouchStart('v')}
              />

              {/* Origin dot */}
              <circle cx={centerX} cy={centerY} r="3.5" fill="#ffffff" />
            </svg>
          </div>

          {/* Formulas and measurements console */}
          <div className="md:col-span-2 flex flex-col justify-between h-full font-mono text-xs text-zinc-400 space-y-4">
            <div className="space-y-3 bg-zinc-950 p-4 rounded-lg border border-zinc-900">
              <div className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1">
                <Grid3X3 className="w-3.5 h-3.5 text-indigo-400" />
                Active Coords
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-900/60">
                <span className="text-indigo-400 font-bold">Search (u):</span>
                <span className="text-white">[{u.x.toFixed(1)}, {u.y.toFixed(1)}]</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-900/60">
                <span className="text-rose-450 font-bold text-rose-400">Context (v):</span>
                <span className="text-white">[{v.x.toFixed(1)}, {v.y.toFixed(1)}]</span>
              </div>
            </div>

            <div className="space-y-3 bg-zinc-950 p-4 rounded-lg border border-zinc-900">
              <div className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] mb-1">
                Vector Computations
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-900/60">
                <span>Dot Product (u · v):</span>
                <span className="text-indigo-300 font-semibold">{dotProductUV.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-zinc-900/60">
                <span>Cosine Sim (u, v):</span>
                <span className={`font-semibold ${simUV > 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  {simUV.toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Angle Difference:</span>
                <span className="text-zinc-200">
                  {Math.round((Math.acos(Math.max(-1, Math.min(1, simUV))) * 180) / Math.PI)}°
                </span>
              </div>
            </div>

            {/* Formula notation overlay */}
            <div className="p-3 bg-zinc-900/40 rounded-lg border border-zinc-900 text-[10px] leading-relaxed text-zinc-500">
              <span className="font-semibold text-indigo-400">Similarity Metric:</span> Cosine Similarity calculates the angle difference between vectors rather than dimensions. It is the gold standard for matching user prompts in RAG applications because it focuses on search direction!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
