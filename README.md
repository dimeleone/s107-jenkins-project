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

1. Construindo uma imagem docker com dockerfile:
```
docker build -t s107-jenkins-node ./docker/jenkins 
```

2. Executar o container:
```
docker-compose -f docker-compose-jenkins.yaml up -d
```

3. Parar e excluir o container:
```
docker-compose -f docker-compose-jenkins.yaml down --volumes
```
