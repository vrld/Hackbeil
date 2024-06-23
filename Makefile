.PHONY: all clean watch

SRC=config.yaml
SRC+=$(wildcard footprints/*)

all: build/pcbs/hackbeil.kicad_pcb preview

preview: build/pcbs/hackbeil-left.pdf build/pcbs/hackbeil-right.pdf build/outlines/keyplate_left.pdf build/outlines/keyplate_right.pdf

build/pcbs/hackbeil.kicad_pcb: $(SRC)
	ergogen . -o build

case: build/cases/bottom.stl build/cases/plate_left.stl build/cases/plate_right.stl build/cases/pcb.stl

%.stl: %.jscad
	npx @jscad/cli@1 "$<" -of stla -o "$@"

%.pdf: %.dxf
	inkscape -Do "$@" -y 1 "$<"

%-left.pdf: %.kicad_pcb
	kicad-cli pcb export pdf -o "$@" -l "F.Cu,F.Silkscreen,User.Drawings,Edge.Cuts,Eco1.User,F.Fab" "$<" -t Gruvbox

%-right.pdf: %.kicad_pcb
	kicad-cli pcb export pdf -o "$@" -m -l "B.Cu,B.Silkscreen,User.Drawings,Edge.Cuts,Eco1.User,B.Fab" "$<" -t Gruvbox

watch: $(SRC)
	ls $^ | entr -n make
