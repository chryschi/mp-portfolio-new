import Carousel from "../../components/Carousel";
import { cardDetails as images } from "./imageList_Aktuelles.jsx";

const Aktuelles = () => {
  return (
    <>
      <Carousel images={images} />
    </>
  );
};

export default Aktuelles;
