# DirIA - Frontend (GuanaCloud)

![DirIA Banner](https://via.placeholder.com/1200x400?text=DirIA+Frontend)

> **Bridging Ancestral Wisdom with Modern AI Cloud Technology.**

Este repositorio contiene el código fuente del frontend para la plataforma **DirIA** (parte del ecosistema GuanaCloud). Es una aplicación web moderna, reactiva y visualmente impactante diseñada para ofrecer una experiencia de usuario premium, conectando la narrativa de la sabiduría ancestral con la potencia de la inteligencia artificial.

---

## 📋 Tabla de Contenidos

- [Visión de Negocio](#-visión-de-negocio)
- [Stack Tecnológico](#-stack-tecnológico)
- [Diseño y UI/UX](#-diseño-y-uiux)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Uso](#-instalación-y-uso)
- [Scripts Disponibles](#-scripts-disponibles)
- [Guía para Contribuidores](#-guía-para-contribuidores)

---

## 💼 Visión de Negocio

**DirIA** no es solo una plataforma de nube; es una filosofía. Buscamos humanizar la tecnología integrando conceptos de naturaleza, sostenibilidad y sabiduría antigua en herramientas de IA de vanguardia.

### Objetivos Clave
1.  **Experiencia Premium**: La interfaz debe evocar confianza, modernidad y serenidad. No es solo funcional, es una experiencia.
2.  **Accesibilidad**: Herramientas complejas de IA (Consola, Métricas, Administración) presentadas de forma intuitiva.
3.  **Narrativa de Marca**: Cada interacción refuerza nuestra identidad visual (tonos verdes, neón, naturaleza digital).

### Módulos Principales
-   **Landing Page**: La cara pública. Debe "wow" al usuario con animaciones fluidas y una propuesta de valor clara.
-   **Console (App)**: El dashboard principal para los usuarios. Acceso a herramientas de IA.
-   **Admin Panel**: Gestión interna de usuarios, métricas y configuraciones.
-   **Metrics**: Visualización de datos y rendimiento del sistema.
-   **Careers & Legal**: Páginas informativas corporativas.

---

## 🛠 Stack Tecnológico

El proyecto está construido sobre un stack moderno enfocado en **rendimiento**, **escalabilidad** y **experiencia de desarrollo**.

-   **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/) (Rápido HMR y compilación optimizada)
-   **Estilos**:
    -   [TailwindCSS v4](https://tailwindcss.com/) (Utility-first CSS)
    -   **Diseño Responsivo**: Mobile-first.
    -   **Temas**: Soporte nativo para Dark Mode (clase `dark`).
-   **Animaciones**: [Framer Motion](https://www.framer.com/motion/) (Transiciones complejas, scroll animations).
-   **Routing**: [React Router v7](https://reactrouter.com/)
-   **Iconografía**: [Lucide React](https://lucide.dev/)
-   **Calidad de Código**: ESLint + Prettier.

---

## 🎨 Diseño y UI/UX

Nuestro sistema de diseño es **crítico** para la identidad de DirIA.

### Paleta de Colores (Tailwind Config)
La identidad visual se define en `tailwind.config.js` bajo la extensión `colors.diria`:

| Color | Token | Hex | Uso |
|-------|-------|-----|-----|
| **Green** | `diria.green` | `#2D5016` | Elementos naturales, fondos profundos. |
| **Neon Green** | `diria.neonGreen` | `#00ff9d` | Acentos principales, estados de éxito, "energía". |
| **Blue** | `diria.blue` | `#0077BE` | Confianza, tecnología, enlaces. |
| **Neon Blue** | `diria.neonBlue` | `#00ccff` | Acentos secundarios, gradientes tecnológicos. |
| **Dark** | `diria.dark` | `#0a0a0a` | Fondo principal (Dark Mode). |
| **Card** | `diria.card` | `#111111` | Fondo de componentes/tarjetas (Glassmorphism base). |

### Tipografía
-   **Encabezados**: `Montserrat` (Moderno, geométrico, fuerte).
-   **Cuerpo**: `Inter` (Legible, neutro, estándar en UI moderna).

### Principios de Diseño
1.  **Glassmorphism**: Uso extensivo de fondos translúcidos (`backdrop-blur`) para crear profundidad.
2.  **Glow Effects**: Sombras de colores neón para resaltar elementos interactivos.
3.  **Micro-interacciones**: Feedback visual inmediato al hover o click.
4.  **Espaciado Generoso**: Uso de espacio negativo para evitar saturación cognitiva.

---

## 📂 Estructura del Proyecto

```bash
src/
├── assets/          # Imágenes, fuentes y recursos estáticos
├── components/      # Componentes de React
│   ├── common/      # Botones, Modales, Inputs reutilizables
│   ├── dashboard/   # Componentes específicos de la consola/admin
│   ├── landing/     # Secciones de la página de aterrizaje (Hero, Features, etc.)
│   ├── layout/      # Navbar, Footer, Sidebar
│   └── ui/          # Componentes base de UI (atomos)
├── context/         # React Context (Estado global)
├── i18n/            # Configuraciones de internacionalización (si aplica)
├── pages/           # Vistas principales (Rutas)
│   ├── AdminPage.tsx
│   ├── ConsolePage.tsx
│   ├── LandingPage.tsx
│   ├── MetricsPage.tsx
│   ├── CareersPage.tsx
│   └── legal/       # Privacy, Terms
├── App.tsx          # Configuración de Rutas principal
├── main.tsx         # Punto de entrada
└── index.css        # Estilos globales y directivas de Tailwind
```

---

## 🚀 Instalación y Uso

Asegúrate de tener [Node.js](https://nodejs.org/) (v18+ recomendado) instalado.

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/jsolano1/frontend-guanacloud.git
    cd Frontend-guanacloud
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

---

## 📜 Scripts Disponibles

En el `package.json` encontrarás los siguientes comandos:

-   `npm run dev`: Inicia el servidor de desarrollo con HMR.
-   `npm run build`: Compila la aplicación para producción (genera carpeta `dist`).
-   `npm run preview`: Sirve localmente la versión compilada para pruebas.
-   `npm run lint`: Ejecuta ESLint para buscar errores de código.

---

## 📌 Roadmap & To-Do

- [ ] Completar Policys en legal
- [ ] Agregar redes sociales
- [ ] SEO
- [ ] Login para user Google/MS365 o crear usuario en plataforma
- [ ] Instrumentación del sitio (validar el uso de GA4)
- [ ] Revisar el diseño general del sitio
- [ ] Ajustar como llegan los correos desde el form de contáctenos

---

## 🤝 Guía para Contribuidores

### Flujo de Trabajo
1.  Crea una rama para tu feature o fix: `git checkout -b feature/nueva-funcionalidad`.
2.  Sigue los estándares de código (ESLint se encargará de la mayoría).
3.  Usa componentes existentes en `src/components/common` o `src/components/ui` antes de crear nuevos.
4.  Asegúrate de que el diseño sea **Responsive**.
5.  Haz commit y push de tus cambios.

### Notas para el Equipo de Negocio
-   Si se requiere cambiar textos o imágenes de la Landing Page, revisar `src/pages/LandingPage.tsx` y los componentes en `src/components/landing`.
-   Para actualizaciones de términos legales, editar los archivos en `src/pages/legal`.

---

© 2025 DirIA / GuanaCloud. Todos los derechos reservados.
