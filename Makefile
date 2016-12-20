build:
	make build_linux

build_linux:
	node_modules/.bin/electron-packager ./ --out=dist --platform=linux --arch=x64 --overwrite
	tar czf dist/natif-linux-x64.tar.gz dist/natif-linux-x64/

build_auto:
	node_modules/.bin/electron-packager ./ --out=dist --overwrite

setup:
	npm install
