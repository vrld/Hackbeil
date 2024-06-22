module.exports = {
  params: {
    designator: 'TPH',
    VCC: { type: 'net', value: 'VCC' },
    SDA: { type: 'net', value: 'SDA' },
    RST: { type: 'net', value: 'RST' },
    GND: { type: 'net', value: 'GND' },
    SCL: { type: 'net', value: 'SCL' },
  },
  body: p => {
    const net_names = ['VCC', 'SDA', 'RST', 'GND', 'SCL']
    const x = (i) => i * 2.54 - 5.08;
    const shape = (i) => i == 0 ? 'rect' : 'circle';

    const text = net_names.map((name, i) =>
      `(fp_text user "${name}" (at 1.5 ${x(i)} ${p.rot}) (layer F.SilkS) (effects (font (size 1 1) (thickness .15)) (justify right)))
       (fp_text user "${name}" (at 1.5 ${x(i)} ${p.rot}) (layer B.SilkS) (effects (font (size 1 1) (thickness .15)) (justify left mirror)))`
    )

    const pads = net_names.map((name, i) =>
      `(pad ${i + 1} thru_hole ${shape(i)} (at 0 ${x(i)} ${p.rot}) (size 1.5 1.5) (drill 0.8) (layers *.Cu *.SilkS *.Mask) ${p[name].str})`)

    const silk = [
      `(fp_text user "PS2" (at 0 ${x(6)}) (layer F.SilkS) (effects (font (size 1 1) (thickness .15)) (justify left)))`,
      `(fp_text user "PS2" (at 0 ${x(6)}) (layer B.SilkS) (effects (font (size 1 1) (thickness .15)) (justify right mirror)))`,
      `(fp_rect (start -1.13 ${x(-.5)}) (end 1.13 ${x(4.5)}) (layer F.SilkS) (stroke (width .15) (type solid)))`,
      `(fp_rect (start -1.13 ${x(-.5)}) (end 1.13 ${x(4.5)}) (layer B.SilkS) (stroke (width .15) (type solid)))`,
    ];

    return [
      '(module hackbeil:trackpoint_header (layer F.Cu)',
      p.at,
      `(property "Reference" "${p.ref}" (at 0 -15 ${p.r}) (layer "F.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))`,
      ...text,
      ...pads,
      ...silk,
      ')',
    ].join('')
  }
}
