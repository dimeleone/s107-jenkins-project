pipeline {
    agent any

    environment {
        EMAIL_ADDRESS = "${env.EMAIL_ADDRESS}"
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                archiveArtifacts 'build/'
            }
        }

        stage('Start MongoDB') {
            steps {
                sh 'docker compose -f docker-compose-jenkins.yaml pull mongo'
                sh 'docker compose -f docker-compose-jenkins.yaml up --wait mongo'
            }
        }

        stage('Start Postgres') {
            steps {
                sh 'docker compose -f docker-compose-jenkins.yaml pull postgres'
                sh 'docker compose -f docker-compose-jenkins.yaml up --wait postgres'
            }
        }

        stage('Tests') {
            steps {
                sh 'docker compose -f docker-compose-jenkins.yaml run jest-tests'
            }
        }

        stage('Notification') {
            steps {
                script {
                    sh '''
                    cd scripts/
                    chmod 775 *
                    ./sendNotification.sh $EMAIL_ADDRESS
                   '''
                }
            }
        }
    }
}
