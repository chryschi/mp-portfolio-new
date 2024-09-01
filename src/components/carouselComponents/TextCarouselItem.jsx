import { Link, useParams } from "react-router-dom";
import { forwardRef } from "react";
import PropTypes from "prop-types";

const TextCarouselItem = forwardRef(function TextCarouselItem(props, ref) {
  const { name, project } = useParams();
  const content = props.content;

  return (
    <article className="carousel-text-item" ref={ref}>
      <div>
        {content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}{" "}
      </div>
      <Link to={`/${name}/${project}/projektbeschreibung`}>
        Mehr lesen
        <span className="material-symbols-outlined link-icon-carousel">
          north_east
        </span>
      </Link>
    </article>
  );
});

export default TextCarouselItem;

TextCarouselItem.propTypes = {
  props: PropTypes.object,
  content: PropTypes.array,
};
