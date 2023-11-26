# CI/CD with Jenkins
Repositório para a realização de um projeto de um sistema de CI/CD com Jenkins, da disciplina de Gerência de Configuração e Evolução de Software.

## 💻 Sobre o projeto

Esse é um projeto de uma lista de tarefas desenvolvida para criação de uma pipeline CI/CD utilizando o Jenkins.

Ele foi desenvolvido com o framework [Node](https://nodejs.org/en/).

Endpoints:

- GET /api/task - Lista todas as tarefas.
- GET /api/task/:id - Lista uma tarefa específica.
- POST /api/task - Cria uma nova tarefa.
- PATCH /api/task/:id - Atualiza uma tarefa.
- DELETE /api/task/:id - Deleta uma tarefa.
- GET /api/log - Lista todos os logs.

---

## 💻 Sobre a pipeline CI/CD

A pipeline CI/CD foi desenvolvida utilizando o Jenkins e está dividida em 5 etapas:

- Build: realizado o build do projeto, compilando o typescript e gerando o javascript.
- Start MongoDB: iniciado o container do MongoDB.
- Start Postgres: iniciado o container do Postgres.
- Tests: executado o teste do projeto, rodando os testes da aplicação.
- Notification: envio de um e-mail com o resultado da pipeline.

---

## 🛠 Requisitos

Git Bash (Git for Windows): https://gitforwindows.org/

Docker (Docker Desktop for Windows): https://docs.docker.com/get-docker/

Node.js: https://nodejs.org/en/

---

## 📁 Personal Access Token (PAT)

Para configurar o seu token de acesso, entre na sua conta do github e siga os passos abaixo:
1. Entre na opção "Settings".
2. No menu esquerdo procure pela opção "Developer settings".
3. Selecione a opção "Personal Access Tokens" e "Tokens (Classic).
4. Clique em Generate New Token.
5. Defina as permissões de acesso.
6. E no final copie o seu token gerado. Ele será inserido posteriormente na configuração do Jenkins.

---

## 🧭 Configurando o projeto

1. Crie uma pasta no seu computador e dentro dela dê um "Open Git Bash here" e faça o clone do repositório.
```
git clone https://github.com/dimeleone/s107-jenkins-project.git
```

Entre na pasta via terminal do git:
```
cd s107-jenkins-project
```
E execute os comandos abaixo:
```
npm install
```
```
npm start
```
```
npm test
```

2. Construindo a imagem docker do jenkins e publicando no dockerhub:
```
./scrips/buildAndPushDockerImage.sh <docker-hub-access-token>
```

3. Executando o container do jenkins:
```
docker-compose -f docker-compose-jenkins.yaml up jenkins -d
```

4. Execute o passo a seguir APENAS se quiser parar e excluir o container:
```
docker-compose -f docker-compose-jenkins.yaml down --volumes
```

---

## ⚙️ Configurando o Jenkins
Com o docker aberto, acesse o endereço abaixo no seu navegador:
```
http://localhost:8080/
```

Uma senha inicial de administrador será requisitada.
<img alt="Jenkins 1" src="https://i.imgur.com/rxElcbk.png" />

Para obter essa senha vá no seu Docker e clique em "jenkins":
<img alt="Jenkins 1" src="https://i.imgur.com/n6SQgjK.png" />

Depois selecione a opção "Files" e entre na pasta "var", depois "jenkins_home", seguida por "secrets" e encontrará um arquivo denominado "initialAdminPassword". Clique do outro lado do mouse em cima dele e selecione a opção "Edit file". A senha será exibida. 
<img alt="Jenkins 1" src="https://i.imgur.com/4MoGQSd.png" />

Após copiar e colar a senha clique em "Continue".

No próximo passo selecione a opção "Install suggested plugins".
<img alt="Jenkins 1" src="https://i.imgur.com/OgJfnZA.png" />

Aguarde ao término da instalação.
<img alt="Jenkins 1" src="https://i.imgur.com/49NKUCr.png" />

Na próxima etapa você pode clicar em "Skip and continue as admin".
<img alt="Jenkins 1" src="https://i.imgur.com/a2LORyI.png" />

E por fim clique em "Save and Finish".
<img alt="Jenkins 1" src="https://i.imgur.com/nDo1Lki.png" />

---


#### Para continuar com a configuração do Jenkins siga os passos abaixo:


1. Clique em "Novo Item":
<img alt="Jenkins 1" src="https://i.imgur.com/83Tkzs7.png" />


2. Digite o nome da sua pipeline, selecione a opção "Pipeline" e clique em OK.
<img alt="Jenkins 1" src="https://i.imgur.com/WlCwNsC.png" />

3. Não altere nada nas abas "General" e "Advanced Project Options". Iremos configurar apenas a aba "Pipeline".
<img alt="Jenkins 1" src="https://i.imgur.com/XlbggfL.png" />

4. Em "Definition" selecionar a opção "Pipeline script from SCM". E dentro de "SCM" selecionar "Git".
<img alt="Jenkins 1" src="https://i.imgur.com/Oe974kt.png" />

5. Dentro de "Repository URL" deve-se inserir o seu endereço do repositório do github, incluindo o ".git" no final.
<img alt="Jenkins 1" src="https://i.imgur.com/ZtPxZFa.png" />

6. Abaixo de "Credentials" clique em Add -> Jenkins.
<img alt="Jenkins 1" src="https://i.imgur.com/491tmaH.png" />

7. Em "Username" digite o nome de usuário do seu github. Em "Password" digite o seu token "PAT" realizado anteriormente. E no campo "ID" digite um nome para a sua credencial. Depois clique em ADD. 
<img alt="Jenkins 1" src="https://i.imgur.com/o65AALR.png" />

8. Agora selecione a sua credencial na opção "Credentials". E depois clique em "Save". Pronto! O seu projeto já está configurado.
<img alt="Jenkins 1" src="https://i.imgur.com/LdkRsHn.png" />

9. Para executar o seu projeto e visualizar a pipeline, basta apenas clicar na opção "Build Now".
<img alt="Jenkins 1" src="https://i.imgur.com/2U6EbZb.png" />

---

## 🦸 Autor
<table>
  <tr>
    <td align="center"><a href="https://github.com/dimeleone/"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/93099038?s=400&u=e5aba1f8173319b66b22c2394c569e56a5641d04&v=4" width="100px;" alt=""/><br /><sub><b>Dimitri Leone</b></sub></a></td>
  </tr>
</table>
