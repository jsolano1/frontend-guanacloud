import React, { useEffect, useRef, useState } from 'react';

interface NodeConfig {
    id: string;
    label: string;
    sub: string;
    icon?: string;
    image?: string;
    x: number;
    y: number;
    mx: number;
    my: number;
    type: 'user' | 'core' | 'agent' | 'ai' | 'infra' | 'tool';
    status: 'active' | 'dev' | 'plan';
    class?: string;
}

interface Connection {
    from: string;
    to: string;
    color: string;
    dashed?: boolean;
}

const NODES: NodeConfig[] = [
    // -- COLUMNA 1: CANALES (Usuarios) --
    { id: 'app', label: 'Mobile App', sub: 'iOS / Android', icon: '📱', x: 0.1, y: 0.25, mx: 0.2, my: 0.1, type: 'user', status: 'active' },
    { id: 'wa', label: 'WhatsApp/GChat', sub: 'Business API', icon: '💬', x: 0.1, y: 0.5, mx: 0.5, my: 0.1, type: 'user', status: 'active' },
    { id: 'web', label: 'APIs', sub: 'Integraciones', icon: '💻', x: 0.1, y: 0.75, mx: 0.8, my: 0.1, type: 'user', status: 'active' },

    // -- COLUMNA 2: CORE (Gateway & Orchestrator) --
    {
        id: 'gateway',
        label: 'API Gateway',
        sub: 'Cloud Run',
        icon: '🛡️',
        image: '/img/guana_logo_primary.png',
        x: 0.28, y: 0.5,
        mx: 0.3, my: 0.25,
        type: 'core', status: 'active', class: 'is-core'
    },
    {
        id: 'langgraph',
        label: 'Orquestador',
        sub: 'LangGraph State',
        icon: '🧠',
        x: 0.42, y: 0.5,
        mx: 0.7, my: 0.25,
        type: 'core', status: 'active', class: 'is-core'
    },

    // -- COLUMNA 3: ENJAMBRE DE AGENTES (Specialists) --
    { id: 'ag_vision', label: 'Vision', sub: 'Daños Vehiculares', icon: '📸', x: 0.6, y: 0.15, mx: 0.2, my: 0.42, type: 'agent', status: 'dev' },
    { id: 'ag_claims', label: 'Claims', sub: 'Reglas de Negocio', icon: '🚗', x: 0.6, y: 0.32, mx: 0.5, my: 0.42, type: 'agent', status: 'active' },
    { id: 'ag_auditor', label: 'Auditor', sub: 'Compliance & QA', icon: '⚖️', x: 0.6, y: 0.5, mx: 0.8, my: 0.42, type: 'agent', status: 'dev' },
    { id: 'ag_support', label: 'Support', sub: 'Helpdesk / KB', icon: '🎧', x: 0.6, y: 0.68, mx: 0.35, my: 0.55, type: 'agent', status: 'active' },
    { id: 'ag_home', label: 'Home', sub: 'Hogar & Pólizas', icon: '🏠', x: 0.6, y: 0.85, mx: 0.65, my: 0.55, type: 'agent', status: 'plan', class: 'is-future' },

    // -- COLUMNA 4: INFRAESTRUCTURA --
    { id: 'vertex', label: 'Vertex AI', sub: 'Gemini 2.5 Flash/Pro', icon: '✨', x: 0.85, y: 0.12, mx: 0.2, my: 0.75, type: 'ai', status: 'active' },
    { id: 'firestore', label: 'Firestore', sub: 'Memoria', icon: '🔥', x: 0.85, y: 0.24, mx: 0.5, my: 0.75, type: 'infra', status: 'active' },
    { id: 'bq', label: 'BigQuery', sub: 'Analytics', icon: '📊', x: 0.85, y: 0.36, mx: 0.8, my: 0.75, type: 'infra', status: 'active' },
    { id: 'looker', label: 'Looker', sub: 'Dashboards', icon: '📈', x: 0.85, y: 0.48, mx: 0.2, my: 0.88, type: 'infra', status: 'active' },

    // -- COLUMNA 4: TOOLS --
    { id: 'github', label: 'GitHub', sub: 'CI/CD', icon: '🐙', x: 0.85, y: 0.62, mx: 0.4, my: 0.88, type: 'tool', status: 'active' },
    { id: 'asana', label: 'Asana', sub: 'Tasks', icon: '✅', x: 0.85, y: 0.74, mx: 0.6, my: 0.88, type: 'tool', status: 'active' },
    { id: 'reminders', label: 'Reminders', sub: 'Alertas', icon: '⏰', x: 0.85, y: 0.86, mx: 0.8, my: 0.88, type: 'tool', status: 'active' },
    { id: 'gmail', label: 'Email/Chat', sub: 'Notify', icon: '📩', x: 0.95, y: 0.80, mx: 0.5, my: 0.96, type: 'tool', status: 'active' },
];

const CONNECTIONS: Connection[] = [
    { from: 'app', to: 'gateway', color: '#38bdf8' },
    { from: 'wa', to: 'gateway', color: '#38bdf8' },
    { from: 'web', to: 'gateway', color: '#38bdf8' },
    { from: 'gateway', to: 'langgraph', color: '#818cf8' },
    { from: 'langgraph', to: 'ag_vision', color: '#fff', dashed: true },
    { from: 'langgraph', to: 'ag_claims', color: '#fff' },
    { from: 'langgraph', to: 'ag_auditor', color: '#fff', dashed: true },
    { from: 'langgraph', to: 'ag_support', color: '#fff' },
    { from: 'langgraph', to: 'ag_home', color: '#64748b', dashed: true },
    { from: 'ag_vision', to: 'vertex', color: '#f472b6' },
    { from: 'ag_claims', to: 'firestore', color: '#fbbf24' },
    { from: 'ag_claims', to: 'vertex', color: '#f472b6' },
    { from: 'ag_auditor', to: 'bq', color: '#34d399' },
    { from: 'ag_auditor', to: 'looker', color: '#34d399' },
    { from: 'ag_auditor', to: 'vertex', color: '#f472b6' },
    { from: 'ag_support', to: 'github', color: '#a78bfa' },
    { from: 'ag_support', to: 'asana', color: '#a78bfa' },
    { from: 'ag_support', to: 'reminders', color: '#a78bfa' },
    { from: 'ag_support', to: 'gmail', color: '#a78bfa' },
    { from: 'ag_support', to: 'looker', color: '#34d399' },
    { from: 'bq', to: 'looker', color: '#fbbf24', dashed: true },
    { from: 'langgraph', to: 'firestore', color: '#fbbf24' }
];

export const ArchitectureDiagram: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Particle System
    const particles = useRef<any[]>([]);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
                setIsMobile(clientWidth < 768);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        class Particle {
            source: NodeConfig | undefined;
            target: NodeConfig | undefined;
            color: string = '#fff';
            progress: number = 0;
            speed: number = 0;

            constructor() {
                this.reset();
            }

            reset() {
                const route = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
                this.source = NODES.find(n => n.id === route.from);
                this.target = NODES.find(n => n.id === route.to);
                this.color = route.color;
                this.progress = 0;
                this.speed = 0.0015 + Math.random() * 0.0015;

                if (!this.source || !this.target) this.reset();
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.reset();
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                if (!this.source || !this.target) return;

                const sx = isMobile ? this.source.mx * dimensions.width : this.source.x * dimensions.width;
                const sy = isMobile ? this.source.my * dimensions.height : this.source.y * dimensions.height;
                const tx = isMobile ? this.target.mx * dimensions.width : this.target.x * dimensions.width;
                const ty = isMobile ? this.target.my * dimensions.height : this.target.y * dimensions.height;

                let cp1x, cp1y, cp2x, cp2y;

                if (isMobile) {
                    cp1x = sx;
                    cp1y = sy + (ty - sy) * 0.5;
                    cp2x = tx;
                    cp2y = sy + (ty - sy) * 0.5;
                } else {
                    cp1x = sx + (tx - sx) * 0.5;
                    cp1y = sy;
                    cp2x = sx + (tx - sx) * 0.5;
                    cp2y = ty;
                }

                const t = this.progress;
                const cx = Math.pow(1 - t, 3) * sx + 3 * Math.pow(1 - t, 2) * t * cp1x + 3 * (1 - t) * Math.pow(t, 2) * cp2x + Math.pow(t, 3) * tx;
                const cy = Math.pow(1 - t, 3) * sy + 3 * Math.pow(1 - t, 2) * t * cp1y + 3 * (1 - t) * Math.pow(t, 2) * cp2y + Math.pow(t, 3) * ty;

                ctx.beginPath();
                ctx.arc(cx, cy, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Init particles if empty
        if (particles.current.length === 0) {
            for (let i = 0; i < 60; i++) {
                particles.current.push(new Particle());
            }
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            // Draw Connections
            CONNECTIONS.forEach(conn => {
                const n1 = NODES.find(n => n.id === conn.from);
                const n2 = NODES.find(n => n.id === conn.to);

                if (n1 && n2) {
                    const x1 = isMobile ? n1.mx * dimensions.width : n1.x * dimensions.width;
                    const y1 = isMobile ? n1.my * dimensions.height : n1.y * dimensions.height;
                    const x2 = isMobile ? n2.mx * dimensions.width : n2.x * dimensions.width;
                    const y2 = isMobile ? n2.my * dimensions.height : n2.y * dimensions.height;

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);

                    let cp1x, cp1y, cp2x, cp2y;

                    if (isMobile) {
                        cp1x = x1;
                        cp1y = y1 + (y2 - y1) * 0.5;
                        cp2x = x2;
                        cp2y = y1 + (y2 - y1) * 0.5;
                    } else {
                        cp1x = x1 + (x2 - x1) * 0.5;
                        cp1y = y1;
                        cp2x = x1 + (x2 - x1) * 0.5;
                        cp2y = y2;
                    }

                    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);

                    ctx.strokeStyle = conn.color;
                    ctx.lineWidth = 1.5;
                    ctx.globalAlpha = 0.15;
                    if (conn.dashed) ctx.setLineDash([5, 5]);
                    else ctx.setLineDash([]);

                    ctx.stroke();
                    ctx.globalAlpha = 1.0;
                }
            });

            // Draw Particles
            particles.current.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, isMobile]);

    return (
        <div ref={containerRef} className="w-full h-full relative bg-[#0f172a] overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.1) 0px, transparent 50%),
                                  radial-gradient(at 100% 100%, rgba(129, 140, 248, 0.1) 0px, transparent 50%)`
            }}></div>

            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Nodes Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {NODES.map(node => {
                    const left = isMobile ? node.mx * 100 + '%' : node.x * 100 + '%';
                    const top = isMobile ? node.my * 100 + '%' : node.y * 100 + '%';

                    return (
                        <div
                            key={node.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl border border-white/10 flex flex-col items-center text-center transition-all duration-300 pointer-events-auto hover:scale-110 hover:border-diria-neonBlue hover:shadow-[0_10px_30px_rgba(56,189,248,0.3)] hover:z-50
                                ${node.class === 'is-core' ? 'bg-diria-core/15 border-diria-core w-36 p-3' : 'bg-slate-800/70 w-32 backdrop-blur-sm'}
                                ${node.class === 'is-future' ? 'border-dashed opacity-70' : ''}
                            `}
                            style={{ left, top }}
                        >
                            {/* Status Indicator */}
                            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border-2 border-[#0f172a]
                                ${node.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : ''}
                                ${node.status === 'dev' ? 'bg-amber-500 animate-pulse' : ''}
                                ${node.status === 'plan' ? 'bg-slate-500 border-white' : ''}
                            `}></div>

                            {node.image ? (
                                <img src={node.image} alt={node.label} className="w-9 h-9 rounded-full object-cover mb-1 border-2 border-white bg-white" />
                            ) : (
                                <div className="text-xl mb-1">{node.icon}</div>
                            )}

                            <div className="text-[11px] font-bold text-white leading-tight">{node.label}</div>
                            {!isMobile && <div className="text-[9px] text-slate-400 mt-0.5">{node.sub}</div>}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            {!isMobile && (
                <div className="absolute bottom-8 left-8 bg-slate-900/80 border border-white/10 p-4 rounded-xl backdrop-blur-md z-20 text-xs grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-slate-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div> Producción
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div> En Desarrollo
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <div className="w-2 h-2 rounded-full bg-slate-500 border border-white"></div> Plan Futuro
                    </div>
                    <div className="col-span-2 pt-2 border-t border-white/10 text-slate-500">
                        Flujos de datos en tiempo real
                    </div>
                </div>
            )}
        </div>
    );
};
