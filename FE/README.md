# App Graph Builder

A responsive "App Graph Builder" built with React + Vite, ReactFlow (xyflow), TanStack Query, Zustand and shadcn/ui-style components. It renders a dotted canvas of service nodes per application, with a node inspector, an application selector backed by mock APIs, and a mobile slide-over drawer.

## Tech stack

- React 18 + Vite + TypeScript (strict)
- ReactFlow — `@xyflow/react` v12
- TanStack Query v5
- Zustand
- Tailwind CSS + shadcn/ui-style primitives (Radix)
- `lucide-react` + `react-icons` for icons

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL (default http://localhost:5173).

## Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server            |
| `npm run build`     | Type-check (`tsc -b`) + production build |
| `npm run preview`   | Preview the production build         |
| `npm run lint`      | Run ESLint                           |
| `npm run typecheck` | Type-check without emitting          |
| `npm run format`    | Format with Prettier                 |

## Features

- **Layout** — top bar (brand + application selector + action cluster), floating left icon rail, dotted ReactFlow canvas, and a right-side node inspector.
- **ReactFlow** — custom service-node cards, drag, click-to-select, Delete/Backspace to remove, zoom/pan, fit-view on load, and connecting nodes.
- **Node inspector** — appears on selection with a status pill, Config/Runtime tabs, an editable name + description, a status control, and a two-way-synced slider + numeric input that persists into the node's data.
- **TanStack Query** — mock `GET /apps` and `GET /apps/:appId/graph` with simulated latency, loading skeletons/spinner, an error state with retry, and cached results (switching back to a visited app is instant).
- **Zustand** — minimal UI state: `selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`, `activeInspectorTab`.
- **Responsive** — below `md`, the application selector + inspector collapse into a slide-over drawer toggled from the top bar.
- **Bonus** — "Add Node" button and keyboard shortcuts (`F` to fit view, `B` to toggle the panel).

## Key decisions

- **ReactFlow store is the single source of truth.** The graph is fetched with TanStack Query and seeded into ReactFlow's uncontrolled store; the inspector reads/writes nodes via `useNodes` / `updateNodeData`. This keeps server state in Query, UI state in Zustand, and graph state in ReactFlow without duplication or prop drilling.
- **Mock API via `setTimeout` promises** (`src/api/mockApi.ts`) — simple, deterministic, no service worker. The application `supertokens-ruby` intentionally rejects to demonstrate the loading → error → retry path.
- **Lightweight component conventions** — named exports, `@/` alias, typed `I*Props`, `memo` + `displayName`, feature-sliced folders. No Storybook / JSON:API layers, since the endpoints are plain JSON and the brief asks to avoid over-engineering.
- **Dark theme** matching the reference design; the top-bar sun/moon are placeholder actions.

## Project structure

```
src/
  api/                 mock data, mock API, TanStack Query hooks, types
  store/uiStore.ts     Zustand UI state
  components/ui/        shadcn/ui-style primitives
  features/appGraph/components/   top bar, left rail, canvas, node, inspector, panels
  App.tsx, main.tsx
```

## Known limitations

- Inspector edits live in ReactFlow state only; switching applications refetches and resets the graph (no persistence layer).
- The error state is simulated through one designated application rather than a random/global failure toggle.
- The left rail and the share/theme actions are static placeholders.
- No automated tests are included.
