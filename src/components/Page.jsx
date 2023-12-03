import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Kontakt from "../pages/Kontakt/Kontakt";
import UeberMich from "../pages/UeberMich";
import Menue from "../pages/Menue";
import CarouselPage from "../pages/CarouselPage";
import "../App.css";
import SlideshowPage from "../pages/SlideshowPage";

const Page = () => {
  const { name, slideshow, projektbeschreibung } = useParams();

  const carouselPages = [
    "innenarchitektur",
    "grafikdesign",
    "architektur",
    "aktuelles",
  ];

  return (
    <>
      <Header />
      {slideshow !== "slideshow" && carouselPages.includes(name) ? (
        <CarouselPage />
      ) : (slideshow === "slideshow" && carouselPages.includes(name)) ||
        projektbeschreibung === "projektbeschreibung" ? (
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
      <Footer />
    </>
  );
};

export default Page;
