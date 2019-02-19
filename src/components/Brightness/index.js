import styled from "styled-components";

import Slider from "rc-slider";

import "rc-slider/assets/index.css";

const Brightness = styled(Slider)`
  margin-bottom: 12px;
  min-width: auto;
  margin-top: 12px;
  .rc-slider-rail {
    background: #464646;
  }

  .rc-slider-track {
    background: #636363;
  }

  .rc-slider-handle {
    border: 0px;
  }
`;

export default Brightness;
