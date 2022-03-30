dev:
	docker-compose up -d
build:
	docker build -t ${tag} .
clean:
	docker rmi -f ${tag}
run:
	docker run -d -p ${port}:${port} --name ${name} ${tag}
