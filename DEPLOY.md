# Deploying UltimateAdmin to GitHub Pages

This guide will walk you through deploying your React application to GitHub Pages.

## Prerequisites

1.  **Git Installed**: Ensure you have Git installed on your system.
2.  **GitHub Account**: You need a GitHub account.
3.  **Project Ready**: Make sure your project is running correctly locally.

## Steps

### 1. Initialize Git (If not already done)

Open your terminal in the project root and run:

```bash
git init
git add .
git commit -m "Initial commit of UltimateAdmin"
```

### 2. Create a Repository on GitHub

1.  Go to [GitHub.com](https://github.com) and log in.
2.  Click the **+** icon in the top right and select **New repository**.
3.  Name your repository (e.g., `ultimate-admin-demo`).
4.  Leave it **Public** (required for free GitHub Pages).
5.  Do **not** initialize with README, .gitignore, or license.
6.  Click **Create repository**.

### 3. Connect Local Project to GitHub

Copy the commands from the section **…or push an existing repository from the command line** and run them in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ultimate-admin-demo.git
git branch -M main
git push -u origin main
```

_(Replace `YOUR_USERNAME` and `ultimate-admin-demo` with your actual details)_

### 4. Deploy to GitHub Pages

Once your code is on GitHub, run the deployment script I've added to your project:

```bash
npm run deploy
```

This command will:

1.  Build your project (`npm run build`).
2.  Push the build folder to a `gh-pages` branch on your repository.

### 5. Configure GitHub Pages

1.  Go to your repository on GitHub.
2.  Click on **Settings** tab.
3.  On the left sidebar, click **Pages**.
4.  Under **Build and deployment** > **Source**, ensure "Deploy from a branch" is selected.
5.  Under **Branch**, select `gh-pages` and folder `/ (root)`.
6.  Click **Save**.

### 6. view Your Live Demo!

After a minute or two, refresh the Pages settings page to see your live URL (e.g., `https://yourusername.github.io/ultimate-admin-demo/`).

---

## Troubleshooting

- **Blank Page?**: If you see a blank page, check the Console in Developer Tools (F12). Ensure the `base` path in `vite.config.js` is set correctly. I've set it to `./` which usually handles relative paths automatically.
- **404 on refresh?**: Since this is a Single Page Application (SPA), refreshing on a sub-page might cause a 404 error on GitHub Pages. This project uses internal state routing so it should be fine, but if you add `react-router-dom` later, you might need a [SPA redirect workaround](https://github.com/rafgraph/spa-github-pages).
