// through hole diameters according to EN 20273
const through_hole_diameters = {
  'M1': { H12: 1.1, H13: 1.2, H14: 1.3 },
  'M1.2': { H12: 1.3, H13: 1.4, H14: 1.5 },
  'M1.6': { H12: 1.7, H13: 1.8, H14: 2 },
  'M2': { H12: 2.2, H13: 2.4, H14: 2.6 },
  'M2.5': { H12: 2.5, H13: 2.9, H14: 2.1 },
  'M3': { H12: 3.2, H13: 3.4, H14: 3.6 },
  'M4': { H12: 4.3, H13: 4.5, H14: 4.8 },
  'M5': { H12: 5.3, H13: 5.5, H14: 5.8 },
};

const drill_size = ({diameter, resolution}) => through_hole_diameters[diameter][resolution];

module.exports = {
  params: {
    designator: 'MH',
    side: 'F',
    resolution: 'H13',
    diameter: 'M2',
    net: { type: 'net', value: 'GND' },
    ring_width: 1,
  },
  body: p => `
  (footprint "ceoloide:mounting_hole_npth"
    (layer "${p.side}.Cu")
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 2.55 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 1 1) (thickness 0.15))))
    (pad "" thru_hole circle
      (at 0 0 ${p.r})
      (size ${drill_size(p) + p.ring_width} ${drill_size(p) + p.ring_width})
      (drill ${drill_size(p)})
      (layers "*.Cu" "*.Mask")
      ${p.net.str})
  )
  `
}
