pipeline {
agent any
environment {
DockerUser="lakshita08"
AWS_ACCOUNT_ID="048578456468"
AWS_DEFAULT_REGION="ap-south-1"
IMAGE_REPO_NAME="growthjockey"
REPOSITORY_URI = "048578456468.dkr.ecr.us-east-1.amazonaws.com/growthjockey"


}

stages {
    stage('Logging into AWS ECR') {
        steps {
            script {
                sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 048578456468.dkr.ecr.ap-south-1.amazonaws.com"

            }

        }

    }
     stage('Cloning Git website') {
        steps {
            git branch: 'main', credentialsId: 'eb9c31e1-3939-4a09-a234-210cf16a4045', url: 'https://github.com/GrowthJockey/livguard-website.git'
            sh 'ls -l'  
            sh 'cd app/'
            sh 'ls -l'
            sh 'cd livguard-common-typescript'
            sh 'ls -l'
        }
    
     }
     
   }

  }
