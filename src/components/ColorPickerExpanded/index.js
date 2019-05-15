import React from "react";
import { CustomPicker } from "react-color";
import "./style.css";
import { Saturation, Hue } from "react-color/lib/components/common";
import HuePointer from "components/HuePointer";

class ColorPickerExpanded extends React.Component {
  render() {
    let refinedProps = Object.assign({}, this.props);
    delete refinedProps["onChangeComplete"];
    return (
      <div className="color-picker">
        <div className="color-picker-hue">
          <Hue
            {...refinedProps}
            pointer={HuePointer}
            direction={"horizontal"}
          />{" "}
        </div>
        <div className="color-picker-sat">
          <Saturation {...refinedProps} style={{height: "20px"}}  />
        </div>
      </div>
    );
  }
}

export default CustomPicker(ColorPickerExpanded);
