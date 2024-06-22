const silkscreen = (side) => `
  (fp_line (start -.5 0) (end -.3 0) (layer ${side}.SilkS) (width .15))
  (fp_line (start .3 0) (end .5 0) (layer ${side}.SilkS) (width .15))
  (fp_line (start -.3 -.3) (end -.3 .3) (layer ${side}.SilkS) (width .15))
  (fp_poly (pts (xy -.3 0) (xy .3 .3) (xy .3 -.3)) (layer ${side}.SilkS) (width .15) (fill none))
`;

const pads = (side, {from, to, rot}, n) => `
  (pad ${(n||0) + 1} smd rect (at -1.65 0 ${rot}) (size 1.5 1.2) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${to.str})
  (pad ${(n||0) + 2} smd rect (at 1.65 0 ${rot}) (size 1.5 1.2) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${from.str})
`;

module.exports = {
  params: {
    designator: 'D',
    sides: ["F", "B"],
    from: undefined,
    to: undefined,
  },
  body: p => `
    (module hackbeil:diode (layer F.Cu)
        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (property Reference "${p.ref}" (at 0 0) (layer ${p.sides[0]}.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))

        ${p.sides.map(silkscreen).join('')}
        ${p.sides.map((s, i) => pads(s, p, 2*i)).join('')})
    (via (at ${p.eaxy(-1.75, 0)}) (size .8) (drill .6) (layers "F.Cu" "B.Cu") (net ${p.from.index}))
    (via (at ${p.eaxy(1.75, 0)}) (size .8) (drill .6) (layers "F.Cu" "B.Cu") (net ${p.to.index}))
    `
}
