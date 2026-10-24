# StudyBuddy

> **Note for reviewers:** StudyBuddy is a **fictional, intentionally flawed** application. It exists only to test [ClearStand](https://github.com/PA1393/IBM-Hackathon-Project) Responsible AI auditing. Its privacy, transparency, and accessibility problems are planted on purpose; please don't fix them outside a ClearStand remediation pull request. All students and data are made up, and the "AI" is a local mock that never calls an external model.

StudyBuddy helps high school students find study partners. It is a static React + TypeScript + Vite single-page app with no backend, database, API keys, or environment variables.

## Run it

```sh
npm install
npm run dev        # http://localhost:5173
```

## Build it

```sh
npm run build      # outputs dist/
npm run preview    # serves the production build locally
```

## Deploy

The build is a plain static site in `dist/`.

- **Vercel (easiest):** import the GitHub repository; it detects Vite automatically (build `npm run build`, output `dist`).
- **Netlify:** build command `npm run build`, publish directory `dist`.

## Layout

| Path | What it is |
| --- | --- |
| `index.html`, `src/main.tsx`, `src/App.tsx` | The web app |
| `src/Signup.tsx`, `src/ProfileCard.tsx`, `src/styles/buttons.css` | Signup form, partner card, button styles |
| `src/components/StudyPartners.tsx`, `src/components/ChatAssistant.tsx` | Match list and study assistant chat |
| `src/matching.ts`, `src/assistant.ts` | Browser versions of the matching and chat logic |
| `src/data/students.ts`, `public/avatars/` | Fictional students and generated avatars |
| `app/*.py` | Reference "backend" code (signup, chat, matching, prompts). Not run by the web app. |

## Planted issues (for ClearStand testing)

The list of intentional issues is kept with the ClearStand project, not here, so the app's code stays a realistic audit target.
