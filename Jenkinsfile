pipeline {
    agent any
    environment {
        REPOSITORY_NAME='livguard-website'
        // BRANCH='feature/livguard'
        //TIME='053000'
        DockerUser="growthjockey"
        AWS_ACCOUNT_ID="048578456468"
        AWS_DEFAULT_REGION="ap-south-1"
        IMAGE_REPO_NAME_stage="livguard-stage"
        IMAGE_REPO_NAME_prod="livguard-prod"
        REPOSITORY_URI = "048578456468.dkr.ecr.us-east-1.amazonaws.com/env.BRANCH_NAME"
    }

    stages {
        stage('Deploy') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 048578456468.dkr.ecr.ap-south-1.amazonaws.com"
                }
            }
        }
  
               }
            }
