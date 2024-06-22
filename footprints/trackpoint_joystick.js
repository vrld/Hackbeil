const coordinates = [
  [-10.5, 11],
  [-11.5, 6],
  [-11.5, -4],
  [-5, -8],
  [5, -8],
  [11.5, -4],
  [11.5, 6],
  [10.5, 11],
];

const layer = '(layer B.SilkS)'
const outline = (coords) => coords
        .filter((_,i) => i > 0)
        .map((x,i) => `(gr_line (start ${coords[i]}) (end ${x}) ${layer} (stroke (width .1) (type solid)) (fill none))`)
        .join('')

module.exports = {
  params: {
    designator: 'TPJ',
    net: { type: 'net', value: 'GND' },
  },
  body: ({eaxy, rot, net, at, r, ref, ref_hide}) => `
    (gr_text "Trackpoint Joystick rev 2" (at ${eaxy(0, 7)} ${rot}) ${layer} (effects (font (size 1 1) (thickness .15)) (justify mirror)))
    (gr_rect (start ${eaxy(-1.2, -1.2)}) (end ${eaxy(1.2, 1.2)}) ${layer} (stroke (width .2) (type solid)) (fill solid))
    (gr_circle (center ${eaxy(0, 0)}) (end ${eaxy(0, 4.5)}) ${layer} (stroke (width .2) (type dot)) (fill solid))
    ${outline(coordinates.map(([x, y]) => eaxy(x, y)))}

    (module "hackbeil:trackpad_joystick_mounting_holes"
      (layer "B.Cu")
      ${at}
      (property "Reference" "${ref}" (at 0 2.55 ${r}) (layer "B.SilkS") ${ref_hide} (effects (font (size 1 1) (thickness 0.15))))
      (pad "" thru_hole circle (at -9.5 .5 ${r}) (size 3.2 3.2) (drill 2.2) (layers "*.Cu" "*.Mask") ${net.str})
      (pad "" thru_hole circle (at  9.5 .5 ${r}) (size 3.2 3.2) (drill 2.2) (layers "*.Cu" "*.Mask") ${net.str}))
  `
}
