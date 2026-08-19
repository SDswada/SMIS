# SMIS

Scaffolding minimal Next.js app (App Router) with NextAuth credentials provider and Prisma.

What's included:
- Basic app/ pages: /, /login, /dashboard
- NextAuth route at app/api/auth/[...nextauth]/route.ts using Credentials and Prisma
- lib/prisma.ts singleton
- prisma/seed.ts seed script (creates a demo school and admin user with password `password123`)

Quick start

1. Install

```bash
npm ci
```

2. Set environment variables (see .env.example). Important: DATABASE_URL

3. Generate Prisma client

```bash
npx prisma generate
```

4. Apply schema

```bash
npx prisma db push
# or use migrations
# npx prisma migrate dev --name init
```

5. Seed (creates admin@sekolah.local / password123)

```bash
npm run db:seed
```

6. Run dev server

```bash
npm run dev
```

Notes
- This is minimal scaffolding to get started. Adjust UI, auth flow, and session settings to your needs.
