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
    let text = net_names.map((name, i) =>
      `(fp_text user "${name}" (at 2.5 ${i * 2.25 - 4.5} ${p.rot}) (layer F.SilkS) (effects (font (size .8 .8) (thickness .15))))
       (fp_text user "${name}" (at 2.5 ${i * 2.25 - 4.5} ${p.rot}) (layer B.SilkS) (effects (font (size .8 .8) (thickness .15)) (justify mirror)))`
    )
    let pads = net_names.map((name, i) => `(pad ${i + 1} thru_hole ${i == 0 ? 'rect' : 'circle'} (at 0 ${i * 2.25 - 4.5} ${p.rot}) (size 1.5 1.5) (drill 0.8) (layers *.Cu *.SilkS *.Mask) ${p[name].str})`)

    return `
      (footprint lib:trackpoint_header (layer F.Cu) (tedit 666C601F)
      ${p.at /* parametric position */}
      ${text.join('') /* pin names */}
      ${pads.join('') /* pin holes */}
      )`
  }
}
