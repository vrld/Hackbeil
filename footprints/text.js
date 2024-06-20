module.exports = {
  params: {
    text: '',
    sides: ['F'],
    knockout: false,
    fontsize: 1
  },
  body: p => [
    '(module lib:text (layer F.Cu) (tedit 648E0265)',
    p.at,
    ...p.sides.map(side => `(fp_text user "${p.text}" (at 0 0 ${p.rot + 90}) (layer ${side}.SilkS ${p.knockout ? "knockout" : ""}) (effects (font (size ${p.fontsize} ${p.fontsize}) (thickness 0.15)) ${side === 'F' ? "" : "(justify mirror)"} ))`),
    ')',
  ].join('')
}
