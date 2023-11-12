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

        stage('Tests') {
            steps {
                sh 'npm run test'
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
