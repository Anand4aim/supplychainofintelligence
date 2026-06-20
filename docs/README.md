# /docs

This folder is published to **GitHub Pages** automatically via `.github/workflows/pages.yml`.

- `index.md`, landing page
- `strategy/`, strategy docs (roadmap, etc.)
- `articles/`, long-form articles and teardowns
- `_config.yml`, Jekyll config (theme, metadata)

## How to enable GitHub Pages (one-time)

After the repo is pushed to GitHub:

1. Go to **Settings → Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Push any change under `docs/` (or run the workflow manually from the **Actions** tab)
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`

That's it. Every future push that touches `docs/` republishes automatically.
