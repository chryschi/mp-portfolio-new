import { Outlet, useParams } from "react-router-dom";
import App from "../App";
import Header from "./Header";
import Footer from "./Footer";
import Aktuelles from "../pages/Aktuelles/Aktuelles";
import Architektur from "../pages/Archtitektur/Architektur";
import Innenarchitektur from "../pages/Innenarchitektur/Innenarchitektur";
import Grafikdesign from "../pages/Grafikdesign/Grafikdesign";
import Kontakt from "../pages/Kontakt/Kontakt";
import UeberMich from "../pages/UeberMich";
import Menue from "../pages/Menue";
import CarouselPage from "../pages/Aktuelles/Aktuelles";
import "../App.css";

const Page = () => {
  const { name } = useParams();

  const carouselPages = [
    "innenarchitektur",
    "grafikdesign",
    "architektur",
    "aktuelles",
  ];

  return (
    <>
      <Header />
      {carouselPages.includes(name) ? (
        <CarouselPage />
      ) : name === "menue" ? (
        <Menue />
      ) : name === "kontakt" ? (
        <Kontakt />
      ) : name === "uebermich" ? (
        <UeberMich />
      ) : (
        <App />
      )}
      <Footer />
    </>
  );
};

export default Page;
