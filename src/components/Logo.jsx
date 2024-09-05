/* eslint-disable react/no-unknown-property */

import PropTypes from "prop-types";

const Logo = ({ fillColor }) => {
  return (
    <svg
      width="512"
      height="512"
      fill={fillColor}
      viewBox="0 0 512 512"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs1" />
      <g id="layer1">
        <path d="M 25.611328,151.14062 V 360.85938 H 41.720703 V 151.14062 Z m 115.353512,0 v 209.71876 h 16.10938 V 151.14062 Z m 115.35352,0 v 209.71876 h 16.10937 V 151.14062 Z m 115.35156,0 v 209.71876 h 16.11133 V 151.14062 Z m 32.22656,0 v 2.07032 16.17968 l 15.64844,0.0117 c 26.83167,-4.1e-4 48.58244,21.75038 48.58203,48.58204 -8.6e-4,26.83075 -21.75127,48.58048 -48.58203,48.58007 l -15.64844,0.01 v 16.18164 2.06836 h 15.19922 c 0.15552,0.004 0.29955,9.5e-4 0.44922,0.002 36.91656,7.9e-4 66.84326,-29.92522 66.84375,-66.84179 -0.008,-36.3396 -29.0462,-66.01569 -65.37695,-66.8125 -0.4889,-0.0161 -0.97766,-0.026 -1.4668,-0.0313 z" />
      </g>
    </svg>
  );
};

export default Logo;

Logo.propTypes = {
  fillColor: PropTypes.string,
};
