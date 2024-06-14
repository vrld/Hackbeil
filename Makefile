.PHONY: all clean watch

SRC=config.yaml
SRC+=$(wildcard footprints/*)

all: build/pcbs/hackbeil.kicad_pcb preview

preview: build/pcbs/hackbeil-left.pdf build/pcbs/hackbeil-right.pdf

build/pcbs/hackbeil.kicad_pcb: $(SRC)
	ergogen . -o build

%.png: %.dxf
	inkscape -Do $@ -y 1 $<

%-left.pdf: %.kicad_pcb
	kicad-cli pcb export pdf -o $@ -l "F.Cu,F.Silkscreen,User.Drawings,Edge.Cuts" $<

%-right.pdf: %.kicad_pcb
	kicad-cli pcb export pdf -o $@ -m -l "B.Cu,B.Silkscreen,User.Drawings,Edge.Cuts" $<

watch: $(SRC)
	ls $^ | entr -n make
