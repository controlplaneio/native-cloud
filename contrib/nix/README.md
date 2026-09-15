# Nix Flake + Dev Shell

This subdirectory holds the nix flake which currently only manages a development
shell.

You can either:

- From the root run:
  - `nix develop ./contrib/nix` or `nix-shell ./contrib/nix`
- From this dir run:
  - `nix develop` or `nix-shell`
- Or leverage `direnv` to auto load/unload the development shell

If you'd like to use `direnv` for this project:

```shell
# from the root of the project
# (or below command can put you at the root of the project)
$ cd "$(git rev-parse --show-toplevel)"

# first add personal local ignores for `.envrc` and `.direnv/`
# either use your editor or these commands
$ echo ".envrc" >> .git/info/exclude
$ echo ".direnv/" >> .git/info/exclude

# create the `.envrc` file
$ echo "use flake ./contrib/nix" > .envrc

# approve the `.envrc` if you're happy
$ direnv allow
```

## Playwright

To run playwright tests it's best to use a container.

It can be difficult to match versions via nix with playwright in `package-lock.json`

```sh
# adjust version to match or use `jq` to extract it
export PW_VERSION="$(jq < package-lock.json '.packages."node_modules/playwright-core".version')"

# to just run headless:
docker run --rm -it -v "$PWD:/app" -w /app "mcr.microsoft.com/playwright:v$VERSION-noble" npm run test:e2e

# to run in ui mode over HTTP:
docker run --rm -it -p 9323:9323 -v "$PWD:/app" -w /app "mcr.microsoft.com/playwright:v$VERSION-noble" npm run test:e2e:ui -- --ui-host=0.0.0.0 --ui-port=9323
```
