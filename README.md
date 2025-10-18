# ChatGPT Clone

A modern ChatGPT-like application built with React, Vite, and Tailwind CSS. Features a clean interface for AI conversations with markdown support, syntax highlighting, and smooth animations.

## Features

- 🤖 AI chat interface with conversation history
- 📝 Markdown rendering with GitHub Flavored Markdown support
- 🎨 Syntax highlighting for code blocks
- 🎭 Smooth animations with Framer Motion
- 📱 Responsive design with Tailwind CSS
- 🔥 Hot toast notifications
- 🧭 Client-side routing with React Router
- ⚡ Fast development with Vite and HMR

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4.x with Typography plugin
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Markdown**: React Markdown with remark-gfm
- **Code Highlighting**: React Syntax Highlighter
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd chat-gpt
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── assets/         # Static assets
├── App.jsx         # Main application component
├── main.jsx        # Application entry point
└── index.css       # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
