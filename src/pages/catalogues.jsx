import { imagesAktuelles } from "./Aktuelles/imageLists/imageListAktuelles.jsx";
import { imagesArchitektur } from "./Architektur/imageListArchitektur/imageListArchitektur.jsx";
import { imagesInnenarchitektur } from "./Innenarchitektur/imageLists/imageListInnenarchitektur.jsx";
import { imagesProjectPortfolio } from "./Aktuelles/imageLists/imageListProjectPortfolio.jsx";
import { imagesProjectArchitektur2 } from "./Architektur/imageListArchitektur/imageListProjectArchitektur2.jsx";
import { imagesGrafikdesign } from "./Grafikdesign/imageListGrafikdesign.jsx";

export const cataloguePages = {
  aktuelles: { images: imagesAktuelles, title: "Aktuelles" },
  architektur: { images: imagesArchitektur, title: "Architektur" },
  innenarchitektur: {
    images: imagesInnenarchitektur,
    title: "Innenarchitektur",
  },
  grafikdesign: {
    images: imagesGrafikdesign,
    title: "Grafikdesign",
  },
};

export const catalogueProjects = {
  portfolio: { images: imagesProjectPortfolio, title: "MPR Portfolio Website" },
  "projekt-architektur-2": { images: imagesProjectArchitektur2, title: "" },
};
