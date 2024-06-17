// Copyright (c) 2023 Marco Massarelli
//
// SPDX-License-Identifier: CC-BY-NC-SA-4.0
//
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// Author: @infused-kim + @ceoloide improvements + @vrld refactorings
//
// Description:
//  Reversible footprint for nice!view display. Includes an outline of the
//  display to make positioning easier.
//
//  Note that because the center pin is VCC on both sides, there is no associated jumper pad
//  in the reversible footprint.
//
//  In its default configuration, jumper pads are positioned above the pins, when the
//  component is oriented verically and pointing upwards, or left of the pins, when oriented
//  horizontally and oriented leftward. Jumper pads position can be inverted with a parameter.
//
// Pinout and schematics:
//  https://nicekeyboards.com/docs/nice-view/pinout-schematic
//
// NOTE: modified 2024 Matthias Richter: removed jumpers, autotraces
//
// Params:
//    side: default is F for Front
//      the side on which to place the single-side footprint and designator, either F or B
//    reversible: default is false
//      if true, the footprint will be placed on both sides so that the PCB can be
//      reversible and jumpers will be added
//    include_silkscreen: default is true
//      if true it will include the silkscreen layern
//    include_labels default is true
//      if true and Silkscreen layer is included, it will include the pin labels. The labels
//      will match the *opposite* side of the board when the footprint is set to be reversible, 
//      since they are meant to match the solder jumpers behavior and aid testing.
//    include_traces: default is true
//      if true it will include traces that connect the jumper pads to the vias
//      and the through-holes for the MCU
//    include_courtyard: default is true
//      if true it will include a courtyard outline around the pin header.
//
// @ceoloide's improvements:
//  - Added support for traces
//  - Upgraded to KiCad 8 format
//  - Make silkscreen and courtyard optional
//
// @vrlds reductions:
//  - refactored code
//  - added traces
//  - made jumpers and traces mandatory when reversible

const x = (i) => i * 2.54 - 5.08;
const at = ({ x, y, r }) => `(at ${x} ${y} ${r || ''})`
const rect = ([p, q], layer) => `(fp_rect (start ${p.x} ${p.y}) (end ${q.x} ${q.y}) (layer ${layer}) (stroke (width .12) (type solid)))`

module.exports = {
  params: {
    designator: 'DISP',
    side: 'F',
    reversible: false,
    include_silkscreen: true,
    include_labels: true,
    include_traces: true,
    include_courtyard: true,
    MOSI: { type: 'net', value: 'MOSI' },
    SCK: { type: 'net', value: 'SCK' },
    VCC: { type: 'net', value: 'VCC' },
    GND: { type: 'net', value: 'GND' },
    CS: { type: 'net', value: 'CS' },
  },
  body: p => {
    const nets = ["MOSI", "SCK", "VCC", "GND", "CS"];

    const points = {};
    points.pins = nets.map((_, i) => ({ x: x(i), y: 16.7 }));
    points.jumpers_near = points.pins.map(({ x }) => ({ x, y: 14.8 }));
    points.jumpers_far = points.jumpers_near.map(({ x, y }) => ({ x, y: y - .8 }));
    points.courtyard = [{ x: -6.88, y: 14.9 }, { x: -6.82, y: 18.45 }];
    points.silk = [{ x: x(-.5), y: 15.37 }, { x: x(4.5), y: 18.03 }];
    points.vias = [
      { x: points.jumpers_near[0].x + 1.13, y: points.jumpers_far[0].y, net_index: p.MOSI.index, ref: points.jumpers_far[0] },
      { x: points.jumpers_far[1].x + 1.13, y: points.jumpers_far[1].y, net_index: p.SCK.index, ref: points.jumpers_far[1] },
      { x: points.jumpers_near[3].x - 1.13, y: points.jumpers_near[3].y, net_index: p.GND.index, ref: points.jumpers_far[3] },
      { x: points.jumpers_near[4].x, y: points.jumpers_far[4].y - 1.11, net_index: p.CS.index, ref: points.jumpers_far[4] },
    ];


    const jumper = (side, index, net_to, net_from, first_pad_num) => {
      const near = points.jumpers_near[index];
      const far = points.jumpers_far[index];
      const pad_num = index + first_pad_num;

      const layers = `(layers ${side}.Cu ${side}.Paste ${side}.Mask)`;
      const custom = (p) => `(zone_connect 2) (options (clearance outline) (anchor rect)) (primitives ${p})`;

      const poly_near = '(gr_poly (pts (xy -.625 0) (xy -.625 .3) (xy .625 .3) (xy .625 0) (xy 0 -.4)) (width 0) (fill yes))';
      const poly_far = '(gr_poly (pts (xy -.625 -.4) (xy -.625 .5) (xy 0 .1) (xy .625 .5) (xy .625 -.4)) (width 0) (fill yes))';

      return [
        `(pad ${pad_num} smd custom ${at(near)} (size .8 .2) ${layers} ${net_from.str} ${custom(poly_near)})`,
        `(pad ${pad_num + 5} smd custom ${at(far)} (size 1.2 .2) ${layers} ${net_to.str} ${custom(poly_far)})`,
      ].join('');
    };

    const top = [
      'footprint "ceoloide:display_nice_view"',
      `(layer ${p.side}.Cu)`,
      p.at, /* parametric position */
      `(property "Reference" "${p.ref}" (at 0 20 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))`,
      '(attr exclude_from_pos_files exclude_from_bom)'
    ];

    const front = [
      p.include_courtyard ? rect(points.courtyard, "F.CrtYd") : '',
      p.include_silkscreen ? rect(points.silk, "F.SilkS") : '',

      ...points.pins.filter(_ => p.include_labels).map(({ x, y }, i) =>
        `(fp_text user "${nets[i]}" ${at({ x, y: y + 3, r: 90 })} (layer F.SilkS) (effects (font (size .9 .9) (thickness .15))))`),

      ...nets.filter(_ => p.reversible).map((net, i) => net == "VCC" ? '' : jumper("F", i, p[net], p.local_net(i), 5)),
    ].filter(_ => p.reversible || p.side == "F");

    const back = [
      p.include_courtyard ? rect(points.courtyard, "B.CrtYd") : '',
      p.include_silkscreen ? rect(points.silk, "B.SilkS") : '',

      ...points.pins.filter(_ => p.include_labels).map(({ x, y }, i) =>
        `(fp_text user "${nets[i]}" ${at({ x, y: y + 3, r: 90 })} (layer B.SilkS) (effects (font (size .9 .9) (thickness .15)) (justify mirror)))`),

      ...nets.filter(_ => p.reversible).map((net, i) => net == "VCC" ? '' : jumper("B", 4 - i, p[net], p.local_net(4 - i), 15)),
    ].filter(_ => p.reversible || p.side == "B");

    const holes = points.pins.map((pos, i) => {
      const local_net = (!p.reversible || (i == 2)) ? p[nets[i]] : p.local_net(i)
      return `(pad ${i} thru_hole circle ${at(pos)} (size 1.7 1.7) (drill 1) (layers "*.Cu" "*.Mask") ${local_net.str})`
    });

    const bottom = [
      rect([{ x: 5.4, y: 13.4 }, { x: -5.4, y: -11.9 }], 'Dwgs.User'),
      rect([{ x: 7, y: -18 }, { x: -7, y: -18 }], 'Dwgs.User'),
    ];

    // segments are not part of the footprint => points in global coordinates
    const global = ({ x, y }) => p.eaxy(x, y);

    const segments = nets.map((net, i) => ({
      show: net != "VCC",  // center pin does not have a jumper
      net_index: p.local_net(i).index,
      pin: points.pins[i],
      pad: points.jumpers_near[i],
    })).filter(({ show }) => show).map(({ net_index, pin, pad }) => {
      const start = `(start ${p.eaxy(pin.x, pin.y)})`;
      const end = `(end ${p.eaxy(pad.x, pad.y)})`;
      const width = `(width .25)`;
      const net = `(net ${net_index})`;
      return `(segment ${start} ${end} ${width} (layer "F.Cu") ${net})(segment ${start} ${end} ${width} (layer "B.Cu") ${net})`
    });

    points.vias.forEach((item) => {
      const net = `(net ${item.net_index})`;
      const pos = global(item);
      segments.push(`(via (at ${pos}) (size .6) (drill .3) (layers "F.Cu" "B.Cu") ${net})`);
      segments.push(`(segment (start ${global(item.ref)}) (end ${pos}) (layer "F.Cu") ${net})`);
    });

    // SCK traces
    segments.push(`(segment (start ${global(points.vias[1])}) (end ${global(points.jumpers_far[3])}) (layer B.Cu) (net ${p.SCK.index}))`);

    // GND traces
    const gnd_elbow = global({ x: points.vias[1].x, y: points.vias[2].y });
    segments.push(`(segment (start ${global(points.jumpers_far[1])}) (end ${gnd_elbow}) (layer B.Cu) (net ${p.GND.index}))`);
    segments.push(`(segment (start ${gnd_elbow}) (end ${global(points.vias[2])}) (layer B.Cu) (net ${p.GND.index}))`);

    // MOSI traces
    const mosi_gnd_elbow = global({ x: points.jumpers_far[3].x + 1.5, y: points.jumpers_far[1].y - .71 });
    const mosi_sck_elbow = global({ x: points.jumpers_far[1].x - .76, y: points.jumpers_far[1].y - .71 });
    segments.push(`(segment (start ${global(points.jumpers_far[4])}) (end ${mosi_gnd_elbow}) (layer B.Cu) (net ${p.MOSI.index}))`);
    segments.push(`(segment (start ${mosi_gnd_elbow}) (end ${mosi_sck_elbow}) (layer B.Cu) (net ${p.MOSI.index}))`);
    segments.push(`(segment (start ${mosi_sck_elbow}) (end ${global(points.vias[0])}) (layer B.Cu) (net ${p.MOSI.index}))`);

    // CS traces
    const cs_elbow = global({ x: points.vias[0].x, y: points.vias[3].y });
    segments.push(`(segment (start ${global(points.jumpers_far[0])}) (end ${cs_elbow}) (layer B.Cu) (net ${p.CS.index}))`);
    segments.push(`(segment (start ${cs_elbow}) (end ${global(points.vias[3])}) (layer B.Cu) (net ${p.CS.index}))`);

    return [
      '(',
      ...top,
      ...front,
      ...back,
      ...holes,
      ...bottom,
      ')',
      ...segments.filter(_ => p.reversible),
    ].join('');
  }
}
