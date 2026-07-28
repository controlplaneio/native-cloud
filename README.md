# native.cloud

The source for the [native.cloud](https://native.cloud) website — a static site
built with [Hugo](https://gohugo.io/).

## Repository layout

- `site/` — site content (Markdown)
- `ontology/` — the actual ontology of keys
- `layouts/` — Hugo templates and partials.
- `assets/` — CSS and images processed by Hugo Pipes.
- `hugo.toml` — Hugo site configuration.
- `netlify.toml` — Netlify build and deploy-preview configuration.

## Building and deploying

The live site is built and deployed by Netlify using the configuration in
`netlify.toml`:

- **Production:** `hugo --gc --minify`
- **Deploy preview:** `hugo --gc --minify`
- **Hugo version:** see `HUGO_VERSION` in `netlify.toml`

## Previewing locally

You don't need Hugo installed — run it in a container with Podman or Docker,
using the official Hugo image from GHCR. From the repository root:

```bash
podman run --rm -it \
  -v "$PWD":/project:Z \
  --tmpfs /project/public:rw,mode=1777 \
  --tmpfs /project/resources:rw,mode=1777 \
  -p 1313:1313 \
  ghcr.io/gohugoio/hugo:v0.162.1 \
  server --bind 0.0.0.0 --buildDrafts --noBuildLock
```

Then open <http://localhost:1313/>.


