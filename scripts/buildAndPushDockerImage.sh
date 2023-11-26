#!/bin/bash

# Parar o script caso algum comando falhe
set -e

# Tratar variáveis não definidas como erro
set -u

# Buildar a imagem docker do jenkins
docker build -t s107-jenkins-node:latest ./docker/jenkins

# Fazer login no dockerhub (É necessário passar o token de acesso ao executar o script)
echo $1 | docker login --username dimeleone --password-stdin

# Fazer tag da imagem docker local para o dockerhub
docker tag s107-jenkins-node:latest dimeleone/s107-jenkins-node:latest

# Fazer push da imagem docker para o dockerhub
docker push dimeleone/s107-jenkins-node:latest