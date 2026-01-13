import React, { useEffect, useRef } from 'react';

// --- Tipos y Constantes ---
interface NodeData {
    id: string;
    label: string;
    sub: string;
    icon: string;
    x: number;
    y: number;
    type: string;
}

interface Connection {
    from: string;
    to: string;
    color: string;
    label?: string;
    dual?: boolean;
    dashed?: boolean;
}

const NODES: NodeData[] = [
    // --- NIVEL 1: INTELIGENCIA (Top) ---
    { id: 'LLM', label: 'LLM Reasoner', sub: 'Thought Loop', icon: '✨', x: 0.5, y: 0.1, type: 'LLM' },
    { id: 'firestore', label: 'Agents Memory', sub: 'State Checkpointer', icon: '🔥', x: 0.8, y: 0.15, type: 'checkpointer' },

    // --- NIVEL 2: ENTRADAS Y NÚCLEO (Upper Middle) ---
    { id: 'gchat', label: 'Chat', sub: 'Endpoint: text', icon: '💬', x: 0.15, y: 0.35, type: 'ingress-chat' },
    { id: 'hub', label: 'DirIA Core', sub: 'Orchestrator', icon: '🧠', x: 0.5, y: 0.45, type: 'hub' },
    { id: 'audio', label: 'Audio', sub: 'Endpoint: speak', icon: '🎙️', x: 0.15, y: 0.55, type: 'ingress-audio' },

    // --- NIVEL 3: CAPACIDADES / AGENTES (Lower Middle) ---
    { id: 'Knowledge Agent', label: 'Knowledge Agent', sub: 'Vector Search', icon: '📚', x: 0.25, y: 0.75, type: 'capability' },
    { id: 'Support Agent', label: 'Support Agent', sub: 'Helpdesk Logic', icon: '🎫', x: 0.5, y: 0.75, type: 'capability' },
    { id: 'Analytics Agent', label: 'Analytics Agent', sub: 'Query Analyst', icon: '📊', x: 0.75, y: 0.75, type: 'capability' },

    // --- NIVEL 4: DATOS E INTEGRACIÓN (Bottom) ---
    { id: 'asana', label: 'Asana', sub: 'Task Sync', icon: '✅', x: 0.35, y: 0.92, type: 'external' },
    { id: 'postgres', label: 'Database', sub: 'Logs & Identity', icon: '🐘', x: 0.65, y: 0.92, type: 'data' },
    { id: 'bigquery', label: 'DWH', sub: 'Business DWH', icon: '☁️', x: 0.9, y: 0.85, type: 'data' }
];
const CONNECTIONS: Connection[] = [
    { from: 'gchat', to: 'hub', color: '#38bdf8', label: 'Inbound Event' },
    { from: 'audio', to: 'hub', color: '#f59e0b', label: 'Audio Stream' },
    { from: 'hub', to: 'LLM', color: '#f472b6', dual: true, label: 'Reasoning' },
    { from: 'hub', to: 'firestore', color: '#a78bfa', dual: true, dashed: true, label: 'State Sync' },
    { from: 'hub', to: 'Knowledge Agent', color: '#10b981', label: 'RAG Query' },
    { from: 'hub', to: 'Support Agent', color: '#10b981', label: 'Task Routing' },
    { from: 'hub', to: 'Analytics Agent', color: '#10b981', label: 'Data Request' },
    { from: 'Support Agent', to: 'asana', color: '#818cf8', dashed: true, label: 'Create Task' },
    { from: 'Support Agent', to: 'postgres', color: '#fbbf24', label: 'Log Identity' },
    { from: 'Analytics Agent', to: 'bigquery', color: '#fbbf24', label: 'SQL Query' },
    { from: 'Knowledge Agent', to: 'postgres', color: '#fbbf24', label: 'Vector Search' }
];

// --- Componente Principal ---
// ... (mismos tipos NODES y CONNECTIONS)

const ArchitectureDiagram: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);
    const nodeMapRef = useRef<{ [key: string]: { x: number; y: number; color: string } }>({});

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        class Particle {
            from: { x: number; y: number } = { x: 0, y: 0 };
            to: { x: number; y: number } = { x: 0, y: 0 };
            color = "#fff";
            t = 0;
            speed = 0;
            connection: Connection;

            constructor() {
                const conn = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
                this.connection = conn;
                this.reset();
            }

            reset() {
                this.from = nodeMapRef.current[this.connection.from];
                this.to = nodeMapRef.current[this.connection.to];
                this.color = this.connection.color;
                this.t = 0;
                // Velocidad variable: el LLM es más rápido (procesamiento)
                const baseSpeed = this.connection.to === 'LLM' ? 0.005 : 0.002;
                this.speed = baseSpeed + Math.random() * 0.002;
            }

            update() {
                this.t += this.speed;
                if (this.t >= 1) this.reset();
            }

            draw(context: CanvasRenderingContext2D) {
                if (!this.from || !this.to) return;
                const cx = this.from.x + (this.to.x - this.from.x) * this.t;
                const cy = this.from.y + (this.to.y - this.from.y) * this.t;

                context.beginPath();
                context.arc(cx, cy, 2.5, 0, Math.PI * 2);
                context.fillStyle = this.color;
                context.shadowBlur = 15;
                context.shadowColor = this.color;
                context.fill();
            }
        }

        let particles: Particle[] = Array.from({ length: 60 }, () => new Particle());

        const setup = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            NODES.forEach(n => {
                nodeMapRef.current[n.id] = { x: n.x * width, y: n.y * height, color: '#fff' };
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            CONNECTIONS.forEach(c => {
                const f = nodeMapRef.current[c.from];
                const t = nodeMapRef.current[c.to];
                if (!f || !t) return;

                const isRelated = hoveredNode === c.from || hoveredNode === c.to;

                ctx.beginPath();
                ctx.moveTo(f.x, f.y);
                ctx.lineTo(t.x, t.y);
                ctx.lineWidth = isRelated ? 2 : 1;
                ctx.strokeStyle = c.color;
                // Opacidad dinámica basada en el hover
                ctx.globalAlpha = isRelated ? 0.6 : 0.1;
                ctx.setLineDash(c.dashed ? [5, 5] : []);
                ctx.stroke();
            });

            ctx.globalAlpha = 1;
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        setup();
        animate();
        window.addEventListener('resize', setup);
        return () => {
            window.removeEventListener('resize', setup);
            cancelAnimationFrame(animationFrameId);
        };
    }, [hoveredNode]);


    const LegendItem = ({ color, label }: { color: string; label: string }) => (
        <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase font-medium text-slate-400">
            <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" style={{ backgroundColor: color }} />
            {label}
        </div>
    );

    return (
        <div className="relative w-full h-full bg-[#030303] overflow-hidden font-sans">

            {/* 1. TÍTULO Y LEYENDA (UI FIJA) */}
            <div className="absolute top-10 left-10 z-[100]">
                <h2 className="text-diria-neonGreen font-mono text-xs tracking-[0.4em] uppercase opacity-50">System Architecture</h2>
                <h1 className="text-white text-2xl font-black italic uppercase">Neural Network v3</h1>
            </div>

            {/* 2. CAPA DE FONDO (CANVAS PARA PARTÍCULAS) */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* 3. CAPA DE NODOS (ELEMENTOS HTML) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {NODES.map((node) => (
                    <div
                        key={node.id}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`absolute flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-500 pointer-events-auto group
                        ${node.type === 'hub' ? 'w-44 h-44 rounded-full bg-indigo-500/5 border-indigo-400/40 shadow-[0_0_50px_rgba(129,140,248,0.1)]' : 'w-36 bg-white/[0.03] border-white/10'}
                        ${hoveredNode === node.id ? 'scale-110 border-white/40 bg-white/10' : ''}
                    `}
                        style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{node.icon}</span>
                        <span className="text-[12px] font-bold text-white uppercase tracking-tighter">{node.label}</span>
                        <span className="text-[8px] text-diria-neonGreen/60 font-mono mt-1 uppercase tracking-widest">{node.sub}</span>
                    </div>
                ))}

                {/* <--- AQUÍ DEBES PEGAR EL CÓDIGO DE LAS ETIQUETAS DINÁMICAS ---> */}
                {CONNECTIONS.map((conn, idx) => {
                    const fromNode = NODES.find(n => n.id === conn.from);
                    const toNode = NODES.find(n => n.id === conn.to);
                    if (!fromNode || !toNode) return null;

                    const isVisible = hoveredNode === conn.from || hoveredNode === conn.to;
                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;

                    return (
                        <div
                            key={`label-${idx}`}
                            className={`absolute pointer-events-none transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                                }`}
                            style={{
                                left: `${midX * 100}%`,
                                top: `${midY * 100}%`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: 30 // Asegura que esté sobre todo
                            }}
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 blur-md opacity-20" style={{ backgroundColor: conn.color }} />
                                <span
                                    className="relative text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md bg-black/90 border border-white/10 shadow-2xl backdrop-blur-md whitespace-nowrap"
                                    style={{ color: conn.color }}
                                >
                                    {conn.label || "Data Flow"}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 4. LEYENDA (OPCIONAL SI YA TIENES LAS ETIQUETAS, PERO RECOMENDABLE) */}
            <div className="absolute bottom-10 left-10 grid grid-cols-2 gap-x-6 gap-y-3 bg-black/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10 z-[100]">
                <LegendItem color="#38bdf8" label="GChat / Inbound" />
                <LegendItem color="#f472b6" label="LLM / Reasoning" />
                <LegendItem color="#10b981" label="Agent Capabilities" />
                <LegendItem color="#fbbf24" label="Database / Storage" />
                {/* ... etc */}
            </div>
        </div>
    );
};

export default ArchitectureDiagram;