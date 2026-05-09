# Deploy React Vite App to GitHub Pages

Use these steps to deploy a React app built with Vite using the `gh-pages` package.

## 1. Install gh-pages

```bash
npm i gh-pages
```

## 2. Update package.json

Open `package.json` and add the `homepage` field. Replace `REPONAME` with your GitHub repository name.

```json
{
  "homepage": "REPONAME"
}
```

Then add these scripts inside the `scripts` section:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## 3. Update vite.config.js

Open `vite.config.js` and add the `base` value. Replace `REPONAME` with your repository name.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/REPONAME/',
  plugins: [react()],
})
```

## 4. Deploy the app

Run:

```bash
npm run deploy
```

This command builds the app and publishes the `dist` folder to the `gh-pages` branch.

## 5. Enable GitHub Pages

1. Go to your GitHub repository.
2. Open `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, select the `gh-pages` branch.
5. Save the changes.

Your React app is now deployed.
