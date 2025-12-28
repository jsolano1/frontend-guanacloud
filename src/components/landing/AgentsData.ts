import { Bot, BrainCircuit, BarChart3, CalendarClock, type LucideIcon } from "lucide-react";

export interface Agent {
    icon: LucideIcon;
    title: string;
    color: string;
    description: string;
    uses: string[];
    services: string[];
    departments: string;
}

export const AGENT_DATA: Record<string, Agent> = {
    support: {
        icon: Bot,
        title: "Support Agent (L0)",
        color: "#00ff9d",
        description: "Agente de primera línea que gestiona consultas de clientes 24/7 sin intervención humana. Entiende intención, analiza sentimientos, busca en tu knowledge base, ejecuta acciones y escala solo cuando es realmente necesario.",
        uses: [
            "Atención multicanal: chat web, email, WhatsApp, voz",
            "Resolución autónoma de consultas recurrentes y troubleshooting",
            "Escalamiento inteligente con contexto completo al agente humano"
        ],
        services: [
            "Respuestas personalizadas consultando historial del cliente",
            "Guías paso a paso para resolver problemas técnicos",
            "Procesamiento de devoluciones, cambios y cancelaciones",
            "Consulta de estado de pedidos y envíos en tiempo real",
            "Recolección estructurada de feedback y casos edge"
        ],
        departments: "Customer Service | Customer Success | IT Support | Sales Operations | HR Service Desk"
    },
    knowledge: {
        icon: BrainCircuit,
        title: "Knowledge Agent",
        color: "#FFBF00",
        description: "Centraliza políticas, procedimientos, manuales y documentación dispersa en un cerebro conversacional. Tu equipo pregunta en lenguaje natural y recibe la respuesta exacta con fuentes citadas.",
        uses: [
            "Búsqueda semántica en documentación empresarial completa",
            "Onboarding acelerado con respuestas adaptadas al rol del empleado",
            "Consistencia en respuestas: todos usan la misma fuente de verdad"
        ],
        services: [
            "Navegación en manuales de producto, compliance y procedimientos",
            "Traducción de jerga técnica a lenguaje que cualquiera entiende",
            "Comparación de políticas (ej: 'diferencia entre plan A y plan B')",
            "Detección de preguntas sin respuesta para mejorar documentación",
            "Síntesis de información de múltiples documentos en una respuesta"
        ],
        departments: "Operations | HR | IT | Legal | Compliance | Training | All Departments"
    },
    analytics: {
        icon: BarChart3,
        title: "Analytics Agent",
        color: "#00ccff",
        description: "Convierte preguntas complejas en consultas SQL, gráficos y tablas en 10 segundos. No necesitas saber programar ni esperar a que Data te responda. Conecta con Snowflake, BigQuery y PostgreSQL.",
        uses: [
            "Consultas conversacionales a data warehouses en tiempo real",
            "Generación automática de dashboards y visualizaciones",
            "Análisis predictivo y detección de anomalías en KPIs"
        ],
        services: [
            "Traducción automática de pregunta → SQL optimizado → resultado",
            "Creación de dashboards con explicación narrativa del insight",
            "Comparativas históricas: 'este mes vs mismo mes año pasado'",
            "Detección de anomalías en KPIs con contexto explicativo",
            "Exportación flexible (Excel, PDF, integración con BI tools)"
        ],
        departments: "Finance | Sales | Marketing | Operations | Product | Executive Leadership | Data Teams"
    },
    assistant: {
        icon: CalendarClock,
        title: "Personal Assistant",
        color: "#ff1654",
        description: "Asistente ejecutivo personal que gestiona agenda, prioriza tareas, programa reuniones inteligentemente y mantiene el foco en lo crítico. Aprende patrones de trabajo y anticipa necesidades.",
        uses: [
            "Gestión inteligente de calendario con priorización automática",
            "Scheduling de reuniones considerando preferencias y contexto",
            "Recordatorios proactivos con información relevante pre-meeting"
        ],
        services: [
            "Coordinación de reuniones entre participantes con diferentes time zones",
            "Recordatorios contextuales: 'meeting en 15 min, aquí está el brief'",
            "Gestión de to-dos con priorización por impacto y urgencia",
            "Resúmenes diarios personalizados de agenda y tareas pendientes",
            "Bloqueos inteligentes de tiempo focus basados en patrones de trabajo"
        ],
        departments: "Executive Suite | Sales | Business Development | Project Management | Any Role"
    }
};