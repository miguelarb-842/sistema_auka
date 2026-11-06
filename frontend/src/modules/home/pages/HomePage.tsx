import { HomeCta } from "../components/HomeCta";
import { HomeExperiencia } from "../components/HomeExperiencia";
import { HomeHero } from "../components/HomeHero";
import { HomePerfiles } from "../components/HomePerfiles";
import { HomeSalas } from "../components/HomeSalas";
import { HomeTransparencia } from "../components/HomeTransparencia";

export function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeSalas />
      <HomeExperiencia />
      <HomePerfiles />
      <HomeTransparencia />
      <HomeCta />
    </>
  );
}
