# Baixando a imagem do Jenkins LTS
FROM jenkins/jenkins:lts

# Definindo o usuário root
USER root

# Instalando a versão 18 do NodeJS
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Define email do usuário
ENV EMAIL_ADDRESS=dimeleone@gmail.com

# Instalando o mailutils para envio de e-mail
RUN apt-get install -y mailutils

# Instalando dependencies para o docker
RUN apt-get update && \
    apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common

# Instalando o docker
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io

# Adicionando o usuário jenkins ao grupo docker
RUN usermod -aG docker jenkins

# Usuário jenkins volta a ser o padrão
USER jenkins
