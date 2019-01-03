import React from 'react';
import { CustomPicker } from 'react-color';
import './index.css'
import { Saturation, Hue } from 'react-color/lib/components/common'
import HuePointer from 'components/HuePointer'

class ColorPickerExpanded extends React.Component {
  render() {
    return <div className="color-picker">
      <div className="color-picker-hue"><Hue {...this.props} pointer={HuePointer} direction={'vertical'} /> </div>
      <div className="color-picker-sat"><Saturation {...this.props} pointer={HuePointer} /></div>
    </div>;
  }
}

export default CustomPicker(ColorPickerExpanded);