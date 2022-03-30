dev:
	docker-compose up -d
dev-build:
	docker-compose up --build -d
build:
	docker build -t ${tag} .
clean:
	docker rmi -f ${tag}
run:
	docker run -d -p ${port}:${port} --name ${name} ${tag}
