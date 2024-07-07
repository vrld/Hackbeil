const layer = (side, {knockout}) => knockout ? `(layer ${side}.SilkS knockout)` : `(layer ${side}.SilkS)`;
const font = ({fontsize}) => `(font (size ${fontsize} ${fontsize}) (thickness .15))`
const justify = (side) => side == 'B' ? ' (justify mirror)' : ''
const effects = (side, p) => `(effects ${font(p)}${justify(side)})`

module.exports = {
  params: {
    text: '',
    sides: ['F'],
    knockout: false,
    fontsize: 1
  },
  body: p => p.sides.map(side => `(gr_text "${p.text}" ${p.at} ${layer(side, p)} ${effects(side, p)})`).join('\n')
}
