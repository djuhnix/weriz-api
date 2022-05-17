include .env.development

dev:
	docker-compose --env-file .env.development up -d
dev-build:
	docker-compose --env-file .env.development up --build -d
build:
	docker build -t ${tag} .
clean:
	docker container stop ${APP_NAME}-db ${APP_NAME}-proxy ${APP_NAME}-server
	docker rmi -f ${APP_NAME}_proxy ${APP_NAME}_server
run:
	docker run -d -p ${port}:${port} --name ${name} ${tag}
