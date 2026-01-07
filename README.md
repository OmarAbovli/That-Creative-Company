# Ivory Studio 💎

Ivory Studio is a premium, high-performance digital agency platform built with modern web technologies. It features a stunning 3D procedural background, multilingual support, and industry-leading performance optimizations.

## ✨ Features

- **🚀 Extreme Performance**: Optimized Total Blocking Time (TBT) from 25s to <100ms using asynchronous chunked texture generation.
- **🌍 3D Procedural World**: A dynamic, interactive 3D Earth and Moon background generated on-the-fly using `@react-three/fiber` and custom noise algorithms.
- **🌐 Multilingual (AR/EN)**: Full Right-to-Left (RTL) support for Arabic and Left-to-Right (LTR) for English with seamless switching.
- **🌓 Adaptive Theme**: Sleek Dark Mode (Deep Blue/Cosmic) and Light Mode (Clean/Professional) support.
- **📱 Mobile Optimized**: Section-based lazy loading and micro-chunk processing for smooth performance on mobile CPUs.
- **📈 Advanced SEO**: Open Graph, Twitter Cards, and JSON-LD Structured Data for maximum search visibility.

## 🛠️ Tech Stack

- **Core**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Optimization Tools**: [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), Async Chunk Processing.

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist/` directory, ready to be deployed.

## ⚡ Performance Highlights

This project implements several advanced optimization techniques:
- **Asynchronous Texture Generation**: Heavy procedural calculations for the 3D background are split into tiny 4-row chunks with 10ms CPU-breathing gaps to prevent main-thread blocking.
- **Lazy Section Mounting**: Content sections (Services, Projects, etc.) are only mounted when they enter the viewport, reducing initial JS execution time.
- **Memoized Geometries**: 3D assets like stars and planet segments are calculated once and memoized to prevent re-render overhead.

## 📄 License

Proprietary License - Ivory Studio
