import React from "react";

// Import all hero layout variants
import HeroVertical from "./hero-layouts/HeroVertical";
import HeroTilted from "./hero-layouts/HeroTilted";
import HeroUnsymmetric from "./hero-layouts/HeroUnsymmetric";
import HeroGrid from "./hero-layouts/HeroGrid";
import Dynamic from "./hero-layouts/Dynamic";

// Change this to switch hero layout: "vertical", "tilted", "unsymmetric", "grid"
const selectedHero = "dynamic";

const Hero = () => {
  switch (selectedHero) {
    case "vertical":
      return <HeroVertical />;
    case "tilted":
      return <HeroTilted />;
    case "unsymmetric":
      return <HeroUnsymmetric />;
    case "grid":
      return <HeroGrid />;
    case "dynamic":
      return <Dynamic />
    default:
      return <HeroVertical />;
  }
};

export default Hero;
