module.exports = {
  params: {
    designator: 'TP',
  },
  body: p => {
    const coordinates = '(pts (xy -11.5 -4) (xy -5 -8) (xy 5 -8) (xy 11.5 -4) (xy 11.5 6) (xy 10.5 11) (xy -10.5 11) (xy -11.5 6))'
    const silk = (layer, justify) => [
      `(fp_poly ${coordinates} (layer ${layer}) (stroke (width .1) (type solid)) (fill none))`,
      `(fp_circle (center 0 0) (end 0 4.5) (layer ${layer}) (stroke (width .2) (type dot)) (fill none))`,
      `(fp_rect (start -1.2 -1.2) (end 1.2 1.2) (layer ${layer}) (stroke (width .2) (type solid)) (fill solid))`,
      `(fp_text user "Trackpoint Joystick rev 2" (at 0 7 0) (layer ${layer}) (effects (font (size 1 1) (thickness .15)) ${justify}))`,
    ].join('')
    return `(footprint lib:trackpoint_joystick (layer F.Cu) (tedit 666C601F)
      ${p.at /* parametric position */}

      ${silk('F.SilkS', '')}
      ${silk('B.SilkS', '(justify mirror)')}

      ${''/* screw holes */}
      (pad "" thru_hole circle (at -9.5 0.5) (size 2.5 2.5) (drill 2) (layers *.Cu *.SilkS *.Mask))
      (pad "" thru_hole circle (at 9.5 0.5) (size 2.5 2.5) (drill 2) (layers *.Cu *.SilkS *.Mask))
    )`
  }
}
