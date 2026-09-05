# 🎓 StudentSphere — Cross-Platform Student Tracking & Academic Intelligence Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com)
[![Framework](https://img.shields.io/badge/Framework-React%2019%20%2B%20Vite-61dafb.svg)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)

A comprehensive, cross-platform academic performance tracker, attendance analytics engine, and deliverable pipeline dashboard designed for both desktop web dashboards and native mobile devices.

---

## 🚀 Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
1. Push this repository to GitHub/GitLab.
2. Visit [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will automatically detect `Vite` settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. The included `vercel.json` ensures full SPA client routing and asset caching.

---

### Option 2: Deploy to Netlify
1. Push this repository to GitHub.
2. Log in to [app.netlify.com](https://app.netlify.com) and click **"Add new site" > "Import an existing project"**.
3. Select your repository.
4. Netlify will auto-configure using the included `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy Site**.

---

### Option 3: Deploy to Cloudflare Pages
1. Go to your Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages**.
2. Connect your Git repository.
3. Set build configuration:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

---

### Option 4: Deploy with Docker & NGINX
To build and run the optimized production container locally or on cloud providers (AWS ECS, Google Cloud Run, Render, DigitalOcean):

```bash
# Build the production Docker image
docker build -t studentsphere:latest .

# Run the container on port 80
docker run -d -p 8080:80 --name studentsphere-app studentsphere:latest
```
Access the application at `http://localhost:8080`.

---

### Option 5: Deploy to GitHub Pages
1. In `package.json`, add the `deploy` script:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
2. Run:
   ```bash
   npm install -D gh-pages
   npm run deploy
   ```

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📦 Key Architecture & Features

- **Live Attendance Engine**: Circular SVG gauge with dynamic color thresholds (`<75%` Red detention risk, `75–80%` Amber warning, `>80%` Emerald safe tier), plus an interactive **What-If Simulator**.
- **Marks vs Class Average Benchmark**: Comparative cohort progress bars with drilldowns into Internal 1, Internal 2, Labs, and class medians.
- **Assignment Kanban Pipeline**: Drag-and-drop styled deliverable management (`To Do`, `In Progress`, `Submitted`, `Graded`) with confetti animations upon submission.
- **Historical GPA Progression**: SVG Bézier spline plotting historical SGPA across semesters against cumulative CGPA reference lines.
- **Backlog Remedial Planner**: Arrear notice banner with clearance exam countdown and an interactive syllabus roadmap checklist.
- **Study Focus Clock & Correlation**: Integrated Pomodoro timer, manual session logging modal, and statistical correlation (+0.84) linking study hours to SGPA lift.
- **Cross-Platform Responsive Preview**: 1-click header switcher to preview the mobile smartphone viewport alongside the desktop dashboard grid.

---

## 📄 License
MIT License. Built for modern educational institutions and academic intelligence.
