{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.flake-compat.url = "github:edolstra/flake-compat";
  inputs.flake-compat.flake = false;
  inputs.devshell.url = "github:numtide/devshell";
  inputs.devshell.inputs.nixpkgs.follows = "nixpkgs";

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
      in
      {
        devShell = mkDevShell {
          devshell = {
            name = "native.cloud";
            motd = "";
            packages = with pkgs; [
              hugo
            ];
          };
        };
      }
    );
}
