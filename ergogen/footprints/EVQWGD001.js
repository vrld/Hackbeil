module.exports = {
    params: {
      designator: 'RotaryEncoder_EVQWGD001',
      side: 'F',
      S1: { type: 'net', value: 'S1' },
      S2: { type: 'net', value: 'S2' },
      A: { type: 'net', value: 'A' },
      B: { type: 'net', value: 'B' },
      C: { type: 'net', value: 'GND' },
    },

  body: ({at, ref, ref_hide, side, S1, S2, A, B, C}) => `
  (module "hackbeil:RotaryEncoder_EVQWGD001"
      (layer "${side}.Cu")
      ${at}
      (property "Reference" "${ref}" (at 0 0 -90) (layer "${side}.Fab") ${ref_hide} (effects (font (size 1 1) (thickness 0.15))))
      (property "Value" "RollerEncoder_EVQWGD001" (at -0.1 9 -90) (layer "${side}.Fab") (hide yes) (effects (font (size 1 1) (thickness 0.15))))

      ${/*outline*/''}
      (fp_line (start -8.4 7.4) (end -8.4 -6.4) (stroke (width 0.12) (type solid)) (layer "Dwgs.User"))
      (fp_line (start 8.4 7.4) (end -8.4 7.4) (stroke (width 0.12) (type solid)) (layer "Dwgs.User"))
      (fp_line (start -8.4 -6.4) (end 8.4 -6.4) (stroke (width 0.12) (type solid)) (layer "Dwgs.User"))
      (fp_line (start 8.4 -6.4) (end 8.4 7.4) (stroke (width 0.12) (type solid)) (layer "Dwgs.User"))
      (fp_line (start 7.7 7.6) (end 9.5 7.6) (stroke (width 0.05) (type solid)) (layer "${side}.Fab"))
      (fp_line (start 9.8 7.3) (end 9.8 -6.3) (stroke (width 0.05) (type solid)) (layer "${side}.Fab"))
      (fp_line (start 7.4 -6.3) (end 7.4 7.3) (stroke (width 0.05) (type solid)) (layer "${side}.Fab"))
      (fp_line (start 9.5 -6.6) (end 7.7 -6.6) (stroke (width 0.05) (type solid)) (layer "${side}.Fab"))
      (fp_arc (start 7.7 7.6) (mid 7.487868 7.512132) (end 7.4 7.3) (stroke (width 0.05) (type solid)) (layer "${side}.Fab"))
      (fp_arc (start 9.8 7.3) (mid 9.712132 7.512132) (end 9.5 7.6) (stroke (width 0.05) (type solid)) (layer "${side}.Fab"))
      (fp_arc (start 7.4 -6.3) (mid 7.487868 -6.512132) (end 7.7 -6.6) (stroke (width 0.05) (type solid)) (layer "${side}.Fab"))
      (fp_arc (start 9.5 -6.6) (mid 9.712132 -6.512132) (end 9.8 -6.3) (stroke (width 0.05) (type solid)) (layer "${side}.Fab"))

      ${/*mounting & unused*/''}
      (pad "" thru_hole circle (at -5.625 3.81 270) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") (remove_unused_layers no))
      (pad "" np_thru_hole circle (at -5.625 6.3 270) (size 1.5 1.5) (drill 1.5) (layers "*.Cu" "*.Mask"))

      ${/*pads*/''}
      (pad "A" thru_hole circle (at -5.625 -3.81 270) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") (remove_unused_layers no) ${A.str} (pinfunction "A") (pintype "output"))
      (pad "B" thru_hole circle (at -5.625 -1.27 270) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") (remove_unused_layers no) ${B.str} (pinfunction "B") (pintype "output"))
      (pad "C" thru_hole circle (at -5.625 1.27 270) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") (remove_unused_layers no) ${C.str} (pinfunction "C") (pintype "passive"))
      (pad "S1" thru_hole circle (at -6.85 -6.2 270) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") (remove_unused_layers no) ${S1.str} (pinfunction "S1") (pintype "output"))
      (pad "S2" thru_hole circle (at -5 -6.2 270) (size 1.6 1.6) (drill 0.9) (layers "*.Cu" "*.Mask") (remove_unused_layers no) ${S2.str} (pinfunction "S2") (pintype "output")))
  `
}
