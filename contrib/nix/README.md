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
