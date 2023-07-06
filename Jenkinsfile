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
                    sshagent(['d8ae1e21-5394-44c2-9f82-2f662ce059f1']) {
                      sh "/repos/livguard-website/deploy.sh"
                }
                }
            }
        }
  
               }
            }
