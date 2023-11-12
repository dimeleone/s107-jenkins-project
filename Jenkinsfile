pipeline {
    agent any

    environment {
        EMAIL_ADDRESS = credentials('dimeleone@gmail.com')
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                archiveArtifacts 'build/'
            }
        }

        stage('Tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Notification') {
            steps {
                script {
                    sh './scripts/sendNotification.sh $EMAIL_ADDRESS'
                }
            }
        }
    }
}
