{
  description = "A flake for Clicks apps created with create-clicks-app";

  inputs.clicks.url = "git+ssh://git@github.com/ClicksMinutePer/NixFiles";
  inputs.nixpkgs.follows = "clicks/nixpkgs";
  inputs.flake-utils.follows = "clicks/flake-utils";

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [ pkgs.nodejs-19_x pkgs.nodePackages_latest.pnpm ];
          shellHook = ''
            unset name
          '';
        };
      });
}
