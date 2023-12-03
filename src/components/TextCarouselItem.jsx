import { Link } from "react-router-dom";
import { forwardRef } from "react";

const TextCarouselItem = forwardRef(function TextCarouselItem(props, ref) {
  return (
    <div ref={ref}>
      {props.content.map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
      <Link>Mehr lesen</Link>
    </div>
  );
});

export default TextCarouselItem;
