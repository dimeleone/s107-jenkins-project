FROM jenkins/jenkins:latest

USER root

# install nodejs 18.x
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Define email do usuário
ENV EMAIL_ADDRESS=dimeleone@gmail.com

# install mailutils
RUN apt-get install -y mailutils

USER jenkins
