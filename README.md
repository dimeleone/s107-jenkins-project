# Tasks S107

## Description

Esse é um projeto de um lista de tarefas desenvolvido para criação de uma pipeline CI/CD usando o Jenkins.

## Sobre o projeto

O projto foi desenvolvido com o framework [Node](https://nodejs.org/en/)

Endpoints:

- GET /api/task - Lista todas as tarefas
- GET /api/task/:id - Lista uma tarefa específica
- POST /api/task - Cria uma nova tarefa
- PATCH /api/task/:id - Atualiza uma tarefa
- DELETE /api/task/:id - Deleta uma tarefa

## Sobre a pipeline CI/CD

A pipeline CI/CD foi desenvolvida usando o Jenkins e está dividida em 3 etapas:

- Build: Nessa etapa é feito o build do projeto, compilando o typescript e gerando o javascript.
- Tests: Nessa etapa é feito o teste do projeto, rodando os testes da aplicação.
- Notification: Nessa etapa é feito o envio de um email com o resultado da pipeline.

## Setup jenkins

```
docker build -t s107-jenkins-node ./docker/jenkins

docker-compose -f docker-compose-jenkins.yaml up -d
docker-compose -f docker-compose-jenkins.yaml down --volumes

curl -O http://localhost:8080/jnlpJars/jenkins-cli.jar
docker cp ./jenkins-cli.jar jenkins:/var/jenkins_home/jenkins-cli.jar
docker cp Jenkinsfile jenkins:/var/jenkins_home/Jenkinsfile

docker exec -it jenkins bash
java -jar /var/jenkins_home/jenkins-cli.jar -s http://localhost:8080/ get-credentials
java -jar /var/jenkins_home/jenkins-cli.jar -s http://localhost:8080/ reload-configuration
```
