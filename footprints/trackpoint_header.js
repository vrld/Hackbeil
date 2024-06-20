module.exports = {
  params: {
    designator: 'TP',
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
      `(fp_text user "${name}" (at 3 ${x(i)} ${p.rot}) (layer F.SilkS) (effects (font (size 1 1) (thickness .15))))
       (fp_text user "${name}" (at 3 ${x(i)} ${p.rot}) (layer B.SilkS) (effects (font (size 1 1) (thickness .15)) (justify mirror)))`
    )

    const pads = net_names.map((name, i) =>
      `(pad ${i + 1} thru_hole ${shape(i)} (at 0 ${x(i)} ${p.rot}) (size 1.5 1.5) (drill 0.8) (layers *.Cu *.SilkS *.Mask) ${p[name].str})`)

    const silk = [
      `(fp_text user "PS2 mouse" (at 0 ${x(6.5)}) (layer F.SilkS) (effects (font (size 1 1) (thickness .15))))`,
      `(fp_text user "PS2 mouse" (at 0 ${x(6.5)}) (layer B.SilkS) (effects (font (size 1 1) (thickness .15)) (justify mirror)))`,
      `(fp_rect (start -1.13 ${x(-.5)}) (end 1.13 ${x(4.5)}) (layer F.SilkS) (stroke (width .15) (type solid)))`,
      `(fp_rect (start -1.13 ${x(-.5)}) (end 1.13 ${x(4.5)}) (layer B.SilkS) (stroke (width .15) (type solid)))`,
    ];

    return [
      '(footprint lib:trackpoint_header (layer F.Cu) (tedit 666C601F)',
      p.at,
      ...text,
      ...pads,
      ...silk,
      ')',
    ].join('')
  }
}
