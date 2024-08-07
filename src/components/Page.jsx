import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Kontakt from "../pages/Kontakt/Kontakt";
import UeberMich from "../pages/UeberMich";
import Menue from "../pages/Menue/Menue";
import CarouselPage from "../pages/CarouselPage";
import "../App.css";
import SlideshowPage from "../pages/SlideshowPage";
import { createContext, useState } from "react";

export const PageContext = createContext();

const Page = () => {
  const [firstImageIndexInSlideshow, setFirstImageIndexInSlideshow] =
    useState(1);
  const { name, slideshow } = useParams();

  const carouselPages = [
    "innenarchitektur",
    "grafikdesign",
    "architektur",
    "aktuelles",
  ];

  return (
    <>
      <Header />
      <PageContext.Provider
        value={{ firstImageIndexInSlideshow, setFirstImageIndexInSlideshow }}
      >
        {slideshow === undefined && carouselPages.includes(name) ? (
          <CarouselPage />
        ) : (slideshow === "projektbeschreibung" ||
            slideshow === "slideshow") &&
          carouselPages.includes(name) ? (
          <SlideshowPage />
        ) : name === "menue" ? (
          <Menue />
        ) : name === "kontakt" ? (
          <Kontakt />
        ) : name === "uebermich" ? (
          <UeberMich />
        ) : (
          <div>Diese Seite existiert nicht!</div>
        )}
      </PageContext.Provider>
      <Footer />
    </>
  );
};

export default Page;
