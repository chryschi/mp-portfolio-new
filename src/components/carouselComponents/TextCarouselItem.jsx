import { Link, useParams } from "react-router-dom";
import { forwardRef } from "react";

const TextCarouselItem = forwardRef(function TextCarouselItem(props, ref) {
  const { name, project } = useParams();

  return (
    <article className="carousel-text-item" ref={ref}>
      {props.content.map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
      <Link to={`/${name}/${project}/projektbeschreibung`}>Mehr lesen</Link>
    </article>
  );
});

export default TextCarouselItem;
