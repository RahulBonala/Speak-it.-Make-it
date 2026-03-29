# Speak It. Make It.

A futuristic, voice-first task management and prototyping tool. Speak your ideas, and watch them materialize into interactive "Widget Stacks".

## Features

- **Voice-First Interface**: Control the entire application using natural language commands.
- **Real-Time Visualization**: Watch your words transform into text and actions instantly as you speak.
- **Liquid Orb Hero**: A visually stunning, interactive hero element that responds to your presence.
- **Widget Stacks**: Organizes your tasks and ideas into floating, anti-gravity cards.
- **OLED Black Aesthetic**: A premium, dark-mode-first design system with glassmorphism and subtle gradients.
- **OpenAI Whisper Integration**: (Optional) High-fidelity transcription using the OpenAI Whisper API.
- **Web Speech API**: Real-time streaming transcription for instant feedback.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Voice**: Web Speech API & OpenAI Whisper

## Getting Started

### Prerequisites

- Node.js 18.17+ (recommended: 20+)
- npm 9+

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/RahulBonala/Speak-it.-Make-it.git
   cd Speak-it.-Make-it
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your OpenAI API key if you want Whisper transcription.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable         | Required | Description                          |
| ---------------- | -------- | ------------------------------------ |
| `OPENAI_API_KEY` | No       | OpenAI API key for Whisper transcription. App works without it using the Web Speech API. |

## Scripts

| Command              | Description                         |
| -------------------- | ----------------------------------- |
| `npm run dev`        | Start development server (Turbopack)|
| `npm run build`      | Create production build             |
| `npm run start`      | Start production server             |
| `npm run lint`       | Run ESLint                          |
| `npm run lint:fix`   | Run ESLint with auto-fix            |
| `npm run type-check` | Run TypeScript type checker         |
| `npm run format`     | Format code with Prettier           |
| `npm run format:check` | Check code formatting             |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── health/         # Health check endpoint
│   │   └── transcribe/     # OpenAI Whisper transcription API
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── page.tsx            # Main page (Hero → Onboarding → Workspace)
│   ├── error.tsx           # Global error boundary
│   ├── not-found.tsx       # 404 page
│   ├── loading.tsx         # Loading state
│   ├── icon.tsx            # Dynamic favicon
│   ├── sitemap.ts          # Dynamic sitemap
│   └── globals.css         # Global styles & Tailwind theme
├── components/
│   ├── hero/               # Landing hero section
│   ├── onboarding/         # 3-step onboarding wizard
│   ├── ui/                 # Reusable UI components (LiquidOrb)
│   └── workspace/          # Main workspace (stacks, widgets, voice)
└── lib/
    ├── logger.ts           # Structured logger (replaces console.*)
    ├── types.ts            # TypeScript types
    └── utils.ts            # Utility functions (cn)
```

## Deployment

### Vercel (Recommended)

Deploy instantly with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add `OPENAI_API_KEY` as an environment variable (optional)
4. Deploy

### Docker

```bash
docker build -t speak-it-make-it .
docker run -p 3000:3000 speak-it-make-it
```

## License

[MIT](LICENSE)
