# Speak It. Make It.

A futuristic, voice-first task management and prototyping tool. Speak your ideas, and watch them materialize into interactive "Widget Stacks".

## Features

-   **Voice-First Interface**: Control the entire application using natural language commands.
-   **Real-Time Visualization**: Watch your words transform into text and actions instantly as you speak.
-   **Liquid Orb Hero**: A visually stunning, interactive hero element that responds to your presence.
-   **Widget Stacks**: Organizes your tasks and ideas into floating, anti-gravity cards.
-   **OLED Black Aesthetic**: A premium, dark-mode-first design system with glassmorphism and subtle gradients.
-   **Groq Whisper Integration**: (Optional) High-fidelity transcription using the Groq API.
-   **Web Speech API**: Real-time streaming transcription for instant feedback.

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Voice**: Web Speech API & Groq SDK

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/RahulBonala/Speak-it.-Make-it.git
    cd speak-it-make-it
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  (Optional) Set up Groq API Key:
    -   Create a `.env.local` file in the root directory.
    -   Add your key: `GROQ_API_KEY=your_key_here`

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

-   `src/app`: Next.js App Router pages and layouts.
-   `src/components`: Reusable UI components (Hero, Onboarding, Workspace).
-   `src/lib`: Utility functions and types.

## License

[MIT](LICENSE)
