# AI Coding Agent Instructions - KaraokeB&S

## Project Overview
KaraokeB&S is a real-time karaoke queue management app. Users submit song requests via QR code, admins manage the queue and track who's singing. Frontend: React/TypeScript, Backend: Firebase (Auth + Firestore).

## Architecture

### Core Data Model
- **KaraokeEvent**: Event metadata (code, duration, active status)
- **SongRequest**: Queue items with 3 statuses: `IN_ATTESA` (waiting) → `PROSSIMO` (next) → `SUL_PALCO` (on stage)
- See [types.ts](types.ts) for current interfaces

### Firebase Integration
- **Auth**: Email/password for admin login in [firebase.ts](firebase.ts)
- **Firestore**: Collections likely include `events`, `requests` (inferred from component logic)
- Auth state managed with `onAuthStateChanged()` hook - use this for auth dependency
- Credentials exposed in [firebase.ts](firebase.ts) (public keys are normal for Firebase)

### Routing & Access Control
- Base path: `/KaraokeBS/` (set in [vite.config.ts](vite.config.ts#L4) and [index.tsx](index.tsx#L15))
- `ProtectedRoute` wrapper in [App.tsx](App.tsx#L16): loads user state, redirects unauthenticated to `/queue`
- Route map: `/login` → `/admin` (protected), `/queue` (public), `/submit`, `/sent`
- Non-admin users see queue/submit pages; admins access management

## UI/Styling Conventions

### Design System
- **Theme variables** in [theme.css](theme.css#L1): `--pink` (#ff2bd6), `--violet` (#7c3aed), `--bg1/bg2` (dark gradients)
- **Glassmorphism + Neon**: Cards have `backdrop-filter: blur()` with semi-transparent backgrounds
- **Custom utilities** (e.g., `neon-border-blue`, `neon-text-blue`, `k-card`, `k-wrap`) defined in [theme.css](theme.css)
- Lucide-react icons throughout ([Login.tsx](pages/Login.tsx#L5) example)

### Tailwind Configuration
- Extended in [tailwind.config.js](tailwind.config.js): uses custom CSS, no core extensions needed
- Include `.{js,ts,jsx,tsx}` files in content scan
- Classes: `text-pink-400`, `bg-cyan-500`, `border-white/10` (opacity syntax)

### Language
- Italian UI text ("Admin Portal", "Credenziali non valide", "SUL_PALCO") - maintain consistency

## Development Workflow

### Build & Deploy
- **Dev**: `npm run dev` → runs on `http://localhost:3000`
- **Build**: `npm run build` → Vite outputs to `dist/`
- **Deploy**: `npm run deploy` → pushes `dist/` to GitHub Pages using `gh-pages` package
- Config in [package.json](package.json#L5-L8)

### TypeScript & Module Setup
- Target: ES2022, JSX: react-jsx
- Path alias `@/*` → root directory (use for imports: `import { db } from '@/firebase'`)
- Strict mode enabled, skip lib checks

## Key Patterns & Conventions

### State Management & Firebase
- Use `useState` + `useEffect` for local component state
- Subscribe to auth with `onAuthStateChanged()` - always clean up with `unsubscribe()` return
- Example: [App.tsx](App.tsx#L18-L31) `ProtectedRoute` component pattern
- No Redux/Context API in use - keep logic component-local when possible

### Form Handling
- Controlled components (see [Login.tsx](pages/Login.tsx#L24-L34))
- Format: label → input with icon (via Lucide), error message below
- Use `try-catch` for Firebase operations, set error state for UI display

### Component Structure
- Functional components with TypeScript generics (`React.FC<Props>`)
- Import routing from `react-router-dom` (navigate, useNavigate)
- Example structure: [Submit.tsx](pages/Submit.tsx) wraps [SubmitPage.tsx](pages/SubmitPage.tsx) - check which has logic

### Naming & File Organization
- Page components in `/pages` (lowercase `.tsx`)
- Components export as default (`export default ComponentName`)
- Types centralized in [types.ts](types.ts)
- No component subdirectories yet - keep flat structure

## Integration Points

### Adding Features
1. **New page**: Create in `pages/YourPage.tsx`, add `<Route>` to [App.tsx](App.tsx#L76-L82)
2. **Protected page**: Wrap route with `<ProtectedRoute>` HOC
3. **New data type**: Add interface to [types.ts](types.ts)
4. **Firebase query**: Import `{ getDoc, setDoc, ... }` from firebase/firestore, use `db` from [firebase.ts](firebase.ts)
5. **Styled component**: Use Tailwind classes + theme variables from [theme.css](theme.css)

### Common Dependencies
- React Router: navigation, useNavigate, Routes, Route, Navigate
- Firebase: `firebase/auth`, `firebase/firestore`
- Lucide-react: icon library (import icons by name)
- Tailwind CSS: utility-first styling

## Code Quality Notes
- **Vite-specific**: Hot module reloading enabled; avoid `window.location.reload()`
- **TypeScript**: Strict null checks enforced; validate Firebase data types
- **Accessibility**: Use semantic HTML, label forms properly (see [Login.tsx](pages/Login.tsx#L35))
- **Testing**: No test files present - add `.test.ts` files if tests needed
