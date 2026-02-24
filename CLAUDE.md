# CLAUDE.md — Server & Project Context

This file is loaded automatically at the start of every Claude Code session. It contains everything needed to be productive on this server and project without re-investigation.

---

## Server

| Key | Value |
|-----|-------|
| Hostname | spider |
| OS | Ubuntu 24.04 Noble |
| User | nick |
| Shell | bash |
| IP | 192.168.20.25 |

---

## Project: nickrodriquezwww

- **Location:** `/home/nick/nickrodriquezwww`
- **GitHub repo:** https://github.com/nickr1977/nickrodriquezwww
- **GitHub user:** nickr1977

---

## Stack

- Next.js 16, App Router, TypeScript, Tailwind CSS v4
- Prisma 7 with `@prisma/adapter-pg` (pg driver — NOT the default url-in-schema approach)
- PostgreSQL 17.8 installed natively (not Docker)
- Node.js v20.20.0

---

## Local Development

- **Dev server:** `npm run dev` → http://spider:4000/nickrodriquezwww
- **Prisma Studio:** `npm run studio` → http://localhost:5555
- `basePath` is `/nickrodriquezwww` locally, set via `NEXT_PUBLIC_BASE_PATH` in `.env`
- Production (Cloud Run) has no basePath — serves from `/`
- Local DB URL: `postgresql://nick:localdev@localhost:5432/nickrodriquezwww?schema=public`

---

## Key Commands

```bash
# Dev
npm run dev                                   # Start dev server on port 4000
npm run studio                                # Prisma Studio on port 5555

# Database / Prisma
npx prisma migrate dev --name <name>          # Create and apply a migration
npx prisma generate                           # Regenerate Prisma client
npx prisma migrate deploy                     # Apply migrations in production

# Deploy
git push origin main                          # Triggers CI/CD pipeline
```

---

## Database

### Local
- Engine: PostgreSQL 17.8 (native install, not Docker)
- DB name: `nickrodriquezwww`
- User: `nick`, Password: `localdev`
- URL: `postgresql://nick:localdev@localhost:5432/nickrodriquezwww?schema=public`

### Production
- Google Cloud SQL, instance: `glossy-apex-278715:us-west1:nickrodriquezwww`
- DB: `nickrodriquezwww`, User: `appuser`

### Prisma
- Client singleton: `src/lib/prisma.ts` (uses PrismaPg adapter)
- Config: `prisma.config.ts` (connection string lives here, not in `schema.prisma`)
- After any schema change: run `npx prisma migrate dev --name <name>` then `npx prisma generate`

### Schema Models

**User**
- `id`, `email` (unique), `name`, `createdAt`, `updatedAt`

**Post**
- `id`, `slug` (unique), `title`, `excerpt`, `content`, `published`, `publishedAt`, `createdAt`, `updatedAt`

---

## Google Cloud

| Resource | Value |
|----------|-------|
| Project ID | glossy-apex-278715 |
| Region | us-west1 |
| Cloud Run service | nickrodriquezwww |
| Artifact Registry | us-west1-docker.pkg.dev/glossy-apex-278715/nickrodriquezwww/app |
| Cloud SQL instance | nickrodriquezwww (PostgreSQL 17, Enterprise, db-g1-small) |
| Service account | github-actions@glossy-apex-278715.iam.gserviceaccount.com |

---

## CI/CD

- **Workflow file:** `.github/workflows/deploy.yml`
- **Trigger:** push to `main` branch
- **Pipeline:** `npm ci` → `prisma migrate deploy` → `docker build` → push to Artifact Registry → `gcloud run deploy`
- **GitHub secrets:** `GCP_SA_KEY`, `CLOUD_SQL_CONNECTION_NAME`, `DATABASE_URL`

---

## Project Structure

```
/home/nick/nickrodriquezwww/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page (Hero, About, BlogPreview, Contact sections)
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Tailwind import + dark base styles
│   ├── components/           # Navbar, Hero, About, BlogPreview, Contact, Footer
│   └── lib/
│       └── prisma.ts         # Prisma client singleton
├── prisma/
│   ├── schema.prisma         # DB models
│   └── migrations/           # Migration history
├── prisma.config.ts          # Prisma connection config (holds connection string)
├── next.config.ts            # Next.js config (basePath via env var)
├── Dockerfile                # Multi-stage build for Cloud Run (standalone output)
└── .github/
    └── workflows/
        └── deploy.yml        # CI/CD pipeline
```

---

## Design System

- **Mode:** Dark always (no light mode toggle)
- **Background:** `bg-gray-950` (`#030712`)
- **Text:** `text-gray-100`
- **Accent:** `indigo-400` (labels), `indigo-500/600` (buttons/hovers)
- **Cards:** `bg-gray-900 border border-gray-800 rounded-xl`
- **Section labels:** `text-indigo-400 font-mono text-sm tracking-widest uppercase`
- **Max content width:** `max-w-5xl mx-auto`
- **Prose width:** `max-w-2xl mx-auto`

---

## Workflow Rules

- **Never push to GitHub without explicit user approval.** Always stop after local testing and wait for the user to say "push" or "deploy" before running `git push`.
- **Test locally first.** Verify pages load correctly at http://spider:4000/nickrodriquezwww before requesting push approval.

---

## Gotchas

- **Prisma 7 does NOT support `url=` in `schema.prisma` datasource.** The connection string goes in `prisma.config.ts` and is passed to `PrismaClient` via the adapter. Do not put the connection URL in the datasource block.
- **Always run `npx prisma generate` after schema changes.**
- **Local Postgres uses peer auth by socket.** Prisma connects via TCP, so a password is required. Password was set with `ALTER USER nick PASSWORD 'localdev'`.
- **Port 3000 is occupied** by an unknown system process. Dev server runs on port 4000.
- **`basePath` must be set via env var** (`NEXT_PUBLIC_BASE_PATH`) in `next.config.ts`, not hardcoded, so production (which has no basePath) is unaffected.
- **Pushing workflow files to GitHub** requires a token with the `workflow` scope.
