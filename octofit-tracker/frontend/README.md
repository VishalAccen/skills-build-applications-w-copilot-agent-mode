# OctoFit presentation tier

The React 19 and Vite presentation tier uses `react-router-dom` for navigation and reads collection data from the Node.js API.

## Codespaces configuration

Define `VITE_CODESPACE_NAME` in `.env.local` before starting Vite:

```bash
cp .env.example .env.local
```

Set the value to the Codespace name, for example:

```env
VITE_CODESPACE_NAME=glowing-pancake-5vx6jwjqvwrp3746v
```

The frontend then requests `https://<codespace-name>-8000.app.github.dev/api/...`. When the variable is not set, it safely falls back to `http://localhost:8000/api/...` for local development.

## Run locally

```bash
npm run dev
```

Vite serves the presentation tier on port `5173`.