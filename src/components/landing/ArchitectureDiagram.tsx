import React, { useEffect, useRef, useState } from 'react';

// --- Constantes de Configuración ---
const NODES = [
    { id: 'LLM', label: 'LLM Reasoner', sub: 'Thought Loop', icon: '✨', x: 0.5, y: 0.1, type: 'LLM' },
    { id: 'firestore', label: 'Memory', sub: 'State Sync', icon: '🔥', x: 0.82, y: 0.12, type: 'checkpointer' },
    { id: 'gchat', label: 'Chat', sub: 'User Input', icon: '💬', x: 0.15, y: 0.35, type: 'ingress' },
    { id: 'hub', label: 'DirIA Core', sub: 'Orchestrator', icon: '🧠', x: 0.5, y: 0.45, type: 'hub' },
    { id: 'audio', label: 'Audio', sub: 'User Input', icon: '🎙️', x: 0.15, y: 0.55, type: 'ingress' },

    // DWH Posicionado en la parte media derecha, arriba del analista
    { id: 'bigquery', label: 'DWH', sub: 'Business Data', icon: '☁️', x: 0.88, y: 0.45, type: 'data' },

    // AGENTES (PRODUCTO)
    { id: 'Knowledge Agent', label: 'Knowledge Agent', sub: 'Vector RAG Search', icon: '📚', x: 0.22, y: 0.75, type: 'agent' },
    { id: 'Support Agent', label: 'Support Agent', sub: 'Automated Helpdesk', icon: '🎫', x: 0.5, y: 0.75, type: 'agent' },
    { id: 'Analytics Agent', label: 'Analytics Agent', sub: 'Business Intelligence', icon: '📊', x: 0.78, y: 0.75, type: 'agent' },

    // INFRAESTRUCTURA INFERIOR
    { id: 'asana', label: 'Asana', sub: 'Task Management', icon: '✅', x: 0.35, y: 0.92, type: 'external' },
    { id: 'postgres', label: 'Database', sub: 'Identity & Logs', icon: '🐘', x: 0.65, y: 0.92, type: 'data' },
];

const CONNECTIONS = [
    { from: 'gchat', to: 'hub', color: '#38bdf8', label: 'Input' },
    { from: 'audio', to: 'hub', color: '#38bdf8', label: 'Input' },
    { from: 'hub', to: 'LLM', color: '#f472b6', label: 'Reasoning' },
    { from: 'hub', to: 'firestore', color: '#a78bfa', dashed: true, label: 'Sync' },
    { from: 'hub', to: 'Knowledge Agent', color: '#10b981' },
    { from: 'hub', to: 'Support Agent', color: '#10b981' },
    { from: 'hub', to: 'Analytics Agent', color: '#10b981' },
    { from: 'Support Agent', to: 'asana', color: '#818cf8', dashed: true, label: 'Action' },
    { from: 'Support Agent', to: 'postgres', color: '#fbbf24' },
    { from: 'Knowledge Agent', to: 'postgres', color: '#fbbf24' },
    { from: 'Analytics Agent', to: 'bigquery', color: '#fbbf24', label: 'Query Data' }, // Conexión restaurada
];

const ArchitectureDiagram: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [nodePositions, setNodePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

    class Particle {
        from: { x: number; y: number };
        to: { x: number; y: number };
        color: string;
        t: number;
        speed: number;

        constructor(fromPos: { x: number; y: number }, toPos: { x: number; y: number }, color: string) {
            this.from = fromPos;
            this.to = toPos;
            this.color = color;
            this.t = Math.random();
            this.speed = 0.002 + Math.random() * 0.003;
        }

        update() {
            this.t += this.speed;
            if (this.t >= 1) this.t = 0;
        }

        draw(ctx: CanvasRenderingContext2D) {
            const cx = this.from.x + (this.to.x - this.from.x) * this.t;
            const cy = this.from.y + (this.to.y - this.from.y) * this.t;
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current || !canvasRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            canvasRef.current.width = width;
            canvasRef.current.height = height;

            const newPositions: { [key: string]: { x: number; y: number } } = {};
            NODES.forEach(n => {
                const isMobile = width < 768;
                const posX = isMobile ? (n.x > 0.5 ? 0.85 : n.x < 0.5 ? 0.15 : 0.5) : n.x;
                newPositions[n.id] = { x: posX * width, y: n.y * height };
            });
            setNodePositions(newPositions);

            particlesRef.current = CONNECTIONS.map(c => {
                const f = newPositions[c.from];
                const t = newPositions[c.to];
                return f && t ? new Particle(f, t, c.color) : null;
            }).filter(Boolean) as Particle[];
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || Object.keys(nodePositions).length === 0) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            CONNECTIONS.forEach(c => {
                const f = nodePositions[c.from];
                const t = nodePositions[c.to];
                if (!f || !t) return;
                const isRelated = hoveredNode === c.from || hoveredNode === c.to;
                ctx.beginPath();
                ctx.moveTo(f.x, f.y);
                ctx.lineTo(t.x, t.y);
                ctx.lineWidth = isRelated ? 2 : 1;
                ctx.strokeStyle = c.color;
                ctx.globalAlpha = isRelated ? 0.8 : 0.15;
                ctx.setLineDash(c.dashed ? [5, 5] : []);
                ctx.stroke();
            });

            ctx.globalAlpha = 1;
            particlesRef.current.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [nodePositions, hoveredNode]);

    return (
        <div ref={containerRef} className="relative w-full h-[800px] bg-[#030303] overflow-hidden font-sans  rounded-3xl">

            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

            <div className="absolute inset-0 z-10 pointer-events-none">
                {NODES.map((node) => {
                    const pos = nodePositions[node.id];
                    if (!pos) return null;

                    const isAgent = node.type === 'agent';
                    const isHovered = hoveredNode === node.id;

                    return (
                        <div
                            key={node.id}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            className={`absolute flex flex-col items-center justify-center transition-all duration-500 pointer-events-auto
                                ${node.type === 'hub'
                                    ? 'w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-indigo-500/30 bg-indigo-500/5 shadow-[0_0_40px_rgba(99,102,241,0.1)]'
                                    : 'w-28 md:w-36 p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md'
                                }
                                ${isAgent ? 'border-[#10b981]/60 bg-[#10b981]/10 shadow-[0_0_25px_rgba(16,185,129,0.2)]' : ''}
                                ${isHovered ? 'scale-110 border-white/40 bg-white/10 z-50' : ''}
                            `}
                            style={{ left: `${pos.x}px`, top: `${pos.y}px`, transform: 'translate(-50%, -50%)' }}
                        >
                            <span className={`${node.type === 'hub' ? 'text-4xl' : 'text-3xl'} mb-1`}>{node.icon}</span>
                            <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-tighter text-center ${isAgent ? 'text-[#10b981]' : 'text-white'}`}>
                                {node.label}
                            </span>
                            <span className="text-[8px] text-gray-400 font-mono uppercase mt-1 text-center leading-tight">
                                {node.sub}
                            </span>
                        </div>
                    );
                })}

                {CONNECTIONS.map((conn, idx) => {
                    const f = nodePositions[conn.from];
                    const t = nodePositions[conn.to];
                    if (!f || !t || (hoveredNode !== conn.from && hoveredNode !== conn.to)) return null;

                    return (
                        <div key={idx} className="absolute z-20 pointer-events-none animate-in fade-in zoom-in duration-300"
                            style={{ left: (f.x + t.x) / 2, top: (f.y + t.y) / 2, transform: 'translate(-50%, -50%)' }}
                        >
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-black/95 border border-white/10 text-white whitespace-nowrap shadow-2xl" style={{ color: conn.color }}>
                                {conn.label || 'Flow'}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ArchitectureDiagram;