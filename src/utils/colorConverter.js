// https://stackoverflow.com/questions/22894498/philips-hue-convert-xy-from-api-to-hex-or-rgb/22918909#22918909
export function getXYtoRGB(x, y, bri) {
  let z = 1.0 - x - y;
  let Y = bri / 254.0; // Brightness of lamp
  let X = (Y / y) * x;
  let Z = (Y / y) * z;
  let r = X * 1.612 - Y * 0.203 - Z * 0.302;
  let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  let b = X * 0.026 - Y * 0.072 + Z * 0.962;
  r =
    r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, 1.0 / 2.4) - 0.055;
  g =
    g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, 1.0 / 2.4) - 0.055;
  b =
    b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, 1.0 / 2.4) - 0.055;
  let maxValue = Math.max(r, g, b);
  r /= maxValue;
  g /= maxValue;
  b /= maxValue;
  r = r * 255;
  if (r < 0) {
    r = 255;
  }
  g = g * 255;
  if (g < 0) {
    g = 255;
  }
  b = b * 255;
  if (b < 0) {
    b = 255;
  }
  return [r, g, b];
}

// https://stackoverflow.com/questions/22564187/rgb-to-philips-hue-hsb/22649803#22649803
export function getRGBtoXY(c) {
  // For the hue bulb the corners of the triangle are:
  // -Red: 0.675, 0.322
  // -Green: 0.4091, 0.518
  // -Blue: 0.167, 0.04
  let normalizedToOne = [];
  let cred, cgreen, cblue;
  cred = c[0];
  cgreen = c[1];
  cblue = c[2];
  console.log(cred, cgreen, cblue);
  normalizedToOne[0] = cred / 255;
  normalizedToOne[1] = cgreen / 255;
  normalizedToOne[2] = cblue / 255;
  let red, green, blue;
  // Make red more vivid
  if (normalizedToOne[0] > 0.04045) {
    red = Math.pow((normalizedToOne[0] + 0.055) / (1.0 + 0.055), 2.4);
  } else {
    red = normalizedToOne[0] / 12.92;
  }
  // Make green more vivid
  if (normalizedToOne[1] > 0.04045) {
    green = Math.pow((normalizedToOne[1] + 0.055) / (1.0 + 0.055), 2.4);
  } else {
    green = normalizedToOne[1] / 12.92;
  }
  // Make blue more vivid
  if (normalizedToOne[2] > 0.04045) {
    blue = Math.pow((normalizedToOne[2] + 0.055) / (1.0 + 0.055), 2.4);
  } else {
    blue = normalizedToOne[2] / 12.92;
  }
  let X = red * 0.649926 + green * 0.103455 + blue * 0.197109;
  let Y = red * 0.234327 + green * 0.743075 + blue * 0.022598;
  let Z = red * 0.0 + green * 0.053077 + blue * 1.035763;
  let x = X / (X + Y + Z);
  let y = Y / (X + Y + Z);
  let xy = [];
  xy[0] = x;
  xy[1] = y;
  return xy;
}

export function getFormattedXYtoRGB(light, lightId) {
  let activeColor = {};
  let converted = getXYtoRGB(
    light[lightId].state.xy[0],
    light[lightId].state.xy[1],
    light[lightId].state.bri
  );
  activeColor.r = Math.round(converted[0]);
  activeColor.g = Math.round(converted[1]);
  activeColor.b = Math.round(converted[2]);
  return activeColor;
}
