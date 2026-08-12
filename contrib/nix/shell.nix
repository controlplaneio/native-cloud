let
  flake-compat = ((builtins.fromJSON (builtins.readFile ./flake.lock)).nodes.flake-compat.locked);
  inherit (flake-compat) rev narHash;
in
(import (fetchTarball {
  url = "https://github.com/edolstra/flake-compat/archive/${rev}.tar.gz";
  sha256 = narHash;
}) { src = ./.; }).shellNix
