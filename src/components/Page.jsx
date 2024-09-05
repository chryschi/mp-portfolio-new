import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Kontakt from "../pages/Kontakt/Kontakt";
import UeberMich from "../pages/UeberMich/UeberMich";
import CarouselPage from "../pages/CarouselPage";
import "../App.css";
import SlideshowPage from "../pages/SlideshowPage";
import { createContext, useState } from "react";
import Menue from "../pages/Menue/Menue";

export const PageContext = createContext();
export const MenuContext = createContext();

const Page = () => {
  const [firstImageIndexInSlideshow, setFirstImageIndexInSlideshow] =
    useState(1);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const { name, slideshow } = useParams();

  const carouselPages = [
    "innenarchitektur",
    "grafikdesign",
    "architektur",
    "aktuelles",
  ];

  const toggleMenuVisibility = () => {
    setMenuIsVisible(!menuIsVisible);
  };

  return (
    <>
      <Header
        menuVisible={menuIsVisible}
        visibilityHandler={toggleMenuVisibility}
      />
      <div className="main-content">
        <PageContext.Provider
          value={{ firstImageIndexInSlideshow, setFirstImageIndexInSlideshow }}
        >
          <div
            className="transition-container"
            style={{
              visibility: menuIsVisible ? "hidden" : "visible",
              opacity: menuIsVisible ? "0" : "1",
            }}
          >
            {slideshow === undefined && carouselPages.includes(name) ? (
              <MenuContext.Provider value={{ menuIsVisible }}>
                <CarouselPage />
              </MenuContext.Provider>
            ) : (slideshow === "projektbeschreibung" ||
                slideshow === "slideshow") &&
              carouselPages.includes(name) ? (
              <SlideshowPage />
            ) : name === "kontakt" ? (
              <Kontakt />
            ) : name === "uebermich" ? (
              <UeberMich />
            ) : (
              <div>Diese Seite existiert nicht!</div>
            )}
          </div>
        </PageContext.Provider>

        {
          <Menue
            menuVisible={menuIsVisible}
            visibilityHandler={toggleMenuVisibility}
          />
        }
      </div>

      <Footer />
    </>
  );
};

export default Page;
