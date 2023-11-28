pipeline {
    agent any

    environment {
        REMOTE_PORT = 22
        GITHUB_REPOSITORY_NAME = "livguard-website"
        JENKINS_JOB = "livguard-website"
    }

    tools {
        nodejs "node"
    }

    stages {
        stage("Slack message") {
            steps {
                script {
                    if (env.BRANCH_NAME == "prod" || env.BRANCH_NAME == "stage") {
                        slackSend channel: "C05CFBKKGMT", message: "The deployment process has started for ${JENKINS_JOB}. Branch is ${env.BRANCH_NAME}"
                    }
                }
            }
        }

        stage("Cloning git website") {
            steps {
                git branch: env.BRANCH_NAME, credentialsId: "33c357dc-5f11-4930-9063-07bc866f7cff", url: "https://github.com/GrowthJockey/${GITHUB_REPOSITORY_NAME}.git"
            }
        }

        stage("Health check") {
            steps {
                script {
                    def deploymentTime = new Date().format("yyyy-MM-dd HH:mm:ss")
                    def commitId = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    def deploymentInfo = [
                        deploymentTime: deploymentTime,
                        commitId: commitId
                    ]
                    def jsonContent = groovy.json.JsonOutput.toJson(deploymentInfo)
                    def directory = "./app"
                    writeJSON file: "${directory}/healthCheck.json", json: deploymentInfo
                }
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
                            scp -P $REMOTE_PORT /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_$DIRECTORY/package.json ubuntu@43.204.40.59:/home/ubuntu/$FOLDER/
                            scp -P $REMOTE_PORT /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_$DIRECTORY/package-lock.json ubuntu@43.204.40.59:/home/ubuntu/$FOLDER/
                            scp -P $REMOTE_PORT /var/lib/jenkins/workspace/${GITHUB_REPOSITORY_NAME}_$DIRECTORY/server.js ubuntu@43.204.40.59:/home/ubuntu/$FOLDER/

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
                        sh """ssh ubuntu@43.204.40.59 'sudo su'"""
                        sh """ssh ubuntu@43.204.40.59 '/home/ubuntu/sar-deployment/livguard-$DIRECTORY-deployment.sh'"""
                    }
                }
            }
        }

        stage("Workspace cleanup") {
            steps {
                cleanWs()
            }
        }
    }
}
