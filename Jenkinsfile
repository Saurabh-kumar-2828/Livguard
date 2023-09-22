pipeline {
  agent any

    environment {
        REMOTE_PORT = 22
        GITHUB_REPOSITORY_NAME = "livguard-website"
    }

    tools {
        nodejs "node"
    }

    stages {
        stage("Cloning git website") {
            steps {
                git branch: env.BRANCH_NAME, credentialsId: "33c357dc-5f11-4930-9063-07bc866f7cff", url: "https://github.com/GrowthJockey/${GITHUB_REPOSITORY_NAME}.git"
            }
        }

        stage("Build") {
            steps {
                script {
                    if (env.BRANCH_NAME == "staging") {
                        DIRECTORY = "staging"
                    } else if (env.BRANCH_NAME == "prod") {
                        DIRECTORY = "prod"
                    } else {
                        return
                    }
                    sh """
                        cd /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_${DIRECTORY}
                    """
                    sh "npm ci"
                    sh "npm run build"
                }
            }
        }

        stage("Transfer folder to sar-server") {
            steps {
                script {
                    if (env.BRANCH_NAME == "staging") {
                        DIRECTORY = "staging"
                        FOLDER = "livguard-website"
                    } else if (env.BRANCH_NAME == "prod") {
                        DIRECTORY = "prod"
                        FOLDER = "livguard-website-prod"
                    } else {
                        return
                    }
                    sshagent(["f74f1a2f-5c3d-49e4-a0e5-646f8d9e87ea"]) {
                        sh """
                            scp -r -P $REMOTE_PORT /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_$DIRECTORY/build ubuntu@43.204.40.59:/home/ubuntu/$FOLDER/
                            scp -r -P $REMOTE_PORT /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_$DIRECTORY/public ubuntu@43.204.40.59:/home/ubuntu/$FOLDER/
                            scp -r -P $REMOTE_PORT /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_$DIRECTORY/node_modules ubuntu@43.204.40.59:/home/ubuntu/$FOLDER/
                            scp -P $REMOTE_PORT /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_$DIRECTORY/package.json ubuntu@43.204.40.59:/home/ubuntu/$FOLDER/
                            scp -P $REMOTE_PORT /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_$DIRECTORY/package-lock.json ubuntu@43.204.40.59:/home/ubuntu/$FOLDER/
                        """
                    }
                }
            }
        }

        stage("Deploy") {
            steps {
                script {
                    if (env.BRANCH_NAME == "staging") {
                        DIRECTORY = "staging"
                    } else if (env.BRANCH_NAME == "prod") {
                        DIRECTORY = "prod"
                    } else {
                        return
                    }

                    sshagent(["f74f1a2f-5c3d-49e4-a0e5-646f8d9e87ea"]){
                        sh """ssh ubuntu@ec2-43-204-40-59.ap-south-1.compute.amazonaws.com 'sudo su'"""
                        sh """ssh ubuntu@ec2-43-204-40-59.ap-south-1.compute.amazonaws.com '/home/ubuntu/sar-deployment/livguard-$DIRECTORY-deployment.sh'"""
                    }
                }
            }
        }
    }
}
