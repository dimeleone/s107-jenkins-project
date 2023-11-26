pipeline {
    agent any

    environment {
        EMAIL_ADDRESS = "${env.EMAIL_ADDRESS}"
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install' // Instalando as dependências do projeto
                sh 'npm run build' // Fazendo o build do projeto typescript para javascript
                archiveArtifacts 'build/' // Arquivando os arquivos gerados pelo build
            }
        }

        stage('Start MongoDB') {
            steps {
                sh 'docker compose -f docker-compose-jenkins.yaml pull mongo' // Fazendo o pull da imagem do mongo no docker-compose
                sh 'docker compose -f docker-compose-jenkins.yaml up --wait mongo' // Iniciando o container do mongo
            }
        }

        stage('Start Postgres') {
            steps {
                sh 'docker compose -f docker-compose-jenkins.yaml pull postgres' // Fazendo o pull da image do postgres no docker-compose
                sh 'docker compose -f docker-compose-jenkins.yaml up --wait postgres' // Iniciando o container do postgres
            }
        }

        stage('Tests') {
            steps {
                sh 'docker compose -f docker-compose-jenkins.yaml pull jest-tests' // Fazendo o pull da imagem do jest-tests no docker-compose
                sh 'docker compose -f docker-compose-jenkins.yaml build jest-tests --no-cache' // Fazendo o build da imagem do jest-tests no docker-compose
                sh 'docker compose -f docker-compose-jenkins.yaml run jest-tests' // Executando os testes pelo jest-tests
            }
        }

        stage('Notification') {
            steps {
                script {
                    // Enviando a notificação para o email do usuário
                    sh '''
                    cd scripts/
                    chmod 775 *
                    ./sendNotification.sh $EMAIL_ADDRESS
                   '''
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker compose -f docker-compose-jenkins.yaml down --volumes' // Limpando os containers e volumes criados pelo docker-compose
            }
        }
    }
}
