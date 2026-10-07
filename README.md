# Khushi Singh · Neural Portfolio

A 3D portfolio: each neuron in a neural network holds one section, a 3D typewriter
types the navigation commands, and sections open in a flip-book notebook.

Built with React 19, Vite 8, three.js (React Three Fiber + drei) and framer-motion.

## Run locally

Requires Node 24 (see `engines` in `package.json`).

```bash
npm install
npm run dev       # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run check` | Lint, then build (run before deploying) |
| `npm run deploy:preview` | Deploy a preview URL to Vercel |
| `npm run deploy` | Deploy to production on Vercel |

## Deploy to Vercel

**Option A: Git (recommended).** Push this repo to GitHub, then in Vercel choose
*Add New → Project* and import it. `vercel.json` already sets the framework (Vite),
build command, output directory, caching and security headers, so the defaults work.
Every push to `main` then deploys to production, and other branches get preview URLs.

**Option B: CLI.**

```bash
npm run check            # make sure lint and build pass
npm run deploy:preview   # first run asks you to log in and link the project
npm run deploy           # production
```

## Where things live

| Path | Contents |
|---|---|
| `src/data/sections.js` | Section names, keys, colours and neuron positions |
| `src/data/content.js` | Projects, experience, honors, skills, contacts |
| `src/components/SectionContent.jsx` | The text on each notebook page |
| `src/components/Notebook.jsx` | Notebook, cover and page-flip animation |
| `src/components/typewriter/` | 3D typewriter model and paper/typing engine |
| `src/components/NeuralScene.jsx` | The 3D neural network |
| `src/components/Loader.jsx` | Blockchain loading screen |
| `public/resume.pdf` | Resume linked from the Resume page |
