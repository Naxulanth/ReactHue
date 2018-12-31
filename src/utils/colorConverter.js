import convert from 'color-convert'

export function hsvToHex(hue, sat, ct, bri) {
let h = hue / 182;
let s = sat / 254 * 100;
let l = ct / 500 * 100;
let b = bri / 254 * 100;
return convert.hsv.hex(h,s,b)
}

export function hexToHsv(hex) {
    let hsv = convert.hex.hsv(hex);
    return [hsv[0] * 182, hsv[1] / 100 * 254, hsv[2] / 100 * 254]
}