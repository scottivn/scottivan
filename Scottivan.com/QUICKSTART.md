# scottivan.com — Quick Start

## Get running locally

```bash
cd scottivan.com
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
# Follow prompts, connect scottivan.com domain in Vercel dashboard
```

## Project structure

```
src/
  app/
    layout.tsx        # Root layout + Navbar
    globals.css       # Terminal theme, fonts, CRT scanlines
    page.tsx          # Home / Hero page
    resume/
      page.tsx        # Resume page
  components/
    Navbar.tsx        # Fixed top nav with active state
    Typewriter.tsx    # Animated terminal typewriter
```

## What's built

- **Hero page** — Terminal window with animated typewriter, skill bars, cert badges, interests grid
- **Resume page** — Timeline experience, skills matrix, certs, download PDF link
- **Theme** — Dark terminal aesthetic, JetBrains Mono, green/cyan glows, CRT scanlines

## Things to customize

- Update GitHub/LinkedIn URLs in `Navbar.tsx`
- Update email in `resume/page.tsx` and `page.tsx`
- Add your actual university name in `resume/page.tsx`
- Add a real `public/resume.pdf` for the download link

## Coming next (future sessions)

- `/lab` — Chess widget (Lichess API), BJJ training log, investment dashboards
- `/blog` — MDX-powered writing with syntax highlighting
- `kubectl` easter egg — type commands in a search bar, get pods back
- Dark/light mode toggle
- GitHub activity feed (live commits)
