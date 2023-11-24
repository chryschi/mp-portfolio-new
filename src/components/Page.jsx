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

const Page = () => {
  const { name } = useParams();
  // const pageName = [
  //   "aktuelles",
  //   "architektur",
  //   "grafikdesign",
  //   "innenarchitektur",
  //   "kontakt",
  //   "uebermich",
  // ];

  return (
    <>
      <Header />
      {name === "innenarchitektur" ? (
        <Innenarchitektur />
      ) : name === "grafikdesign" ? (
        <Grafikdesign />
      ) : name === "architektur" ? (
        <Architektur />
      ) : name === "kontakt" ? (
        <Kontakt />
      ) : name === "menue" ? (
        <Menue />
      ) : name === "uebermich" ? (
        <UeberMich />
      ) : name === "aktuelles" ? (
        <Aktuelles />
      ) : (
        <App />
      )}
      <Outlet />
      <Footer />
    </>
  );
};

export default Page;
