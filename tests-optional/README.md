# Optional UI tests (not required to run the site)

These tests click and type in the real components using jsdom.
They need two extra dev tools that the project may not have yet:

    npm i -D jsdom @testing-library/react @testing-library/dom

Run (from the project root, after copying these two files next to each other):

    npx tsx --tsconfig <a tsconfig with "jsx": "react-jsx"> portfolio-lab.ui.test.tsx

The path alias "@/..." must point at the project root, as in a normal Next.js tsconfig.
The pure calculation tests (lib/portfolio-lab/*.test.ts) do NOT need any of this.
