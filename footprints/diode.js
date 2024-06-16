module.exports = {
  params: {
    designator: 'D',
    from: undefined,
    to: undefined,
    side: 'F',
  },
  body: p => {
    const anode_pos = p.side == 'F' ? .3 : -.3;
    const diode_triangle = `
      (fp_line (start ${-anode_pos} -.3) (end ${-anode_pos} .3) (layer ${p.side}.SilkS) (width .1))
      (fp_poly (pts (xy ${-anode_pos} 0) (xy ${anode_pos} .3) (xy ${anode_pos} -.3)) (layer ${p.side}.SilkS) (width .1) (fill none))
    `;

    const anode = p.side == 'F' ? p.from.str : p.to.str;
    const cathode = p.side == 'F' ? p.to.str : p.from.str;

    return `
    (module lib:smd_diode (layer F.Cu) (tedit 5B24D78E)
        ${p.at /* parametric position */}

        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 0) (layer ${p.side}.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer ${p.side}.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

        ${''/* diode symbols */}
        (fp_line (start -.8 0) (end -.3 0) (layer ${p.side}.SilkS) (width .1))
        (fp_line (start .3 0) (end .8 0) (layer ${p.side}.SilkS) (width .1))
        ${diode_triangle}

        ${''/* SMD pads on both sides */}
        (pad 1 smd rect (at -1.65 0 ${p.rot}) (size 0.9 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${cathode})
        (pad 2 smd rect (at 1.65 0 ${p.rot}) (size 0.9 1.2) (layers ${p.side}.Cu ${p.side}.Paste ${p.side}.Mask) ${anode})
    )
    `
  }
}
