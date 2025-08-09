# AI Command Station — Zero Config (Next.js)

This build removes **vercel.json** and **next.config.js** so Vercel auto-detects Next.js.
Use this when you see: *"Function Runtimes must have a valid version..."*

## Deploy (Vercel)
1) Create a new project and **Upload** this folder as a ZIP (or push to GitHub).
2) In Project → Settings → Environment Variables, set:
   - `SMARTMAIL_API_URL`
   - `SMARTMAIL_API_KEY`
   - `SMARTTALK_API_URL`
   - `SMARTTALK_API_KEY`
3) Deploy. Open `/api/health` or click the buttons on the homepage.

## Local
```bash
npm ci
npm run build
npm start
```
Visit http://localhost:3000
