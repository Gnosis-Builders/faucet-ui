pre-build:
	docker buildx create --name mybuilder --driver docker-container --bootstrap || docker buildx use mybuilder	
	yarn build
build:pre-build
	docker buildx build --platform linux/amd64,linux/arm64 -t silkroad.money/faucet-gui:${VERSION} . --push
force-build:pre-build
	docker buildx build --platform linux/amd64,linux/arm64 -t silkroad.money/faucet-gui:${VERSION} . --no-cache --push
run: build
	docker-compose up
run-daemon: build
	docker-compose up -d
force-deploy:force-build
deploy:build