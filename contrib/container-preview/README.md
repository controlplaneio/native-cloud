# Local containerised previewing

## Docker

From the root of the project:

```sh
docker compose -f contrib/container-preview/compose.yaml up --build dev
```

Then open http://localhost:4321 in your browser.

## Podman

From the root of the project:

```sh
podman compose -f contrib/container-preview/compose.yaml up --build dev
```

Then open http://localhost:4321 in your browser.
