{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.flake-compat.url = "github:edolstra/flake-compat";
  inputs.flake-compat.flake = false;
  inputs.devshell.url = "github:numtide/devshell";
  inputs.devshell.inputs.nixpkgs.follows = "nixpkgs";

  # new hugo/gotmpl formatter, not in upstream nixpkgs yet
  inputs.nixpkgs-gotmplfmt-hugo.url = "github:06kellyjac/nixpkgs/init/gotmplfmt-hugo";

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      ...
    }@inputs:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        mkDevShell = inputs.devshell.legacyPackages.${system}.mkShell;
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = pkgs.nodejs_26;

        # it's quite painful to provide the right playwright browsers at the
        # exact matching version for playwright + their new garbage collection
        # prevention requires a writable path in `$PLAYWRIGHT_BROWSERS_PATH/.links`
        #
        # view the `contrib/nix/README.md` for commands to run playwright
        # inside a container
        inherit (inputs.nixpkgs-gotmplfmt-hugo.legacyPackages.${system}) gotmplfmt-hugo;
      in
      {
        devShell = mkDevShell {
          devshell = {
            name = "native.cloud";
            motd = "";
            packages = with pkgs; [
              nodejs

              # formatting
              treefmt
              gotmplfmt-hugo # hugo templates
              nixfmt
              prettier # css, js, yaml, etc.
              taplo # toml
            ];
          };
        };
      }
    );
}
