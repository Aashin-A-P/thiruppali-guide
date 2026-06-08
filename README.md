# thiruppali-guide
Tamil Sunday Mass guide website with readings, introductions, prayers, archives, search, and print-friendly pages built with Next.js and Vercel.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current Version

This version stores posts as JSON files in `content/posts`.

## Admin Publishing Options

The custom admin area is available at `/admin`.

Local login:

```txt
Username: admin
Password: admin123
```

Create `.env.local` from `.env.example`. For production, change `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`.

GitHub saving is used when these values are configured:

```txt
GITHUB_TOKEN
GITHUB_OWNER
GITHUB_REPO
GITHUB_BRANCH
```

If GitHub values are missing during local development, the admin form writes posts to `content/posts` and uploaded images to `public/uploads`.

## Useful Commands

```bash
npm run lint
npm run build
```
