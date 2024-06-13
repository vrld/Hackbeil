.PHONY: all clean watch

SRC=hackbeil.yaml

all: build preview

build: $(SRC)
	ergogen $^ -o $@

preview: $(patsubst %.dxf,%.png,$(wildcard build/**/*.dxf))

%.png : %.dxf
	inkscape -Do $@ -y 1 $<

watch: $(SRC)
	ls $^ | entr -n make
