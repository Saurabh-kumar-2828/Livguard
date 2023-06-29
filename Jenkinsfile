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
        stage('Logging into AWS ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 048578456468.dkr.ecr.ap-south-1.amazonaws.com"
                }
            }
        }

        stage('Cloning Git website') {
            steps {
                //sh 'sudo rm -rf test-23-06-22; mkdir test-23-06-22; cd test-23-06-22; eval "$(ssh-agent -s)"; ssh-add /home/jenkins/sshKeys/bitbuckey-key; git clone git@bitbucket.org:growthjockey-workspace/livguard-website.git; cd livguard-website; git submodule update --init --recursive;'
                //git branch: env.BRANCH_NAME, credentialsId: '68ae340b-3fcc-4af1-b9bd-0ce5e244ead4', url: 'git@bitbucket.org:growthjockey-workspace/livguard-website.git' 
                git branch: '', credentialsId: 'ed9e344e-a5e3-4f67-956a-2550c9175c40', url: 'https://github.com/GrowthJockey/livguard-website.git'
            }
        }
    
        stage('Building image') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'feature/livguard') {
                        withCredentials([string(credentialsId: '1b9711f1-d9cd-4518-9e8e-891f270dfdfd', variable: 'DockerCredentials')]) {
                            sh "docker login -u growthjockey -p ${DockerCredentials}"
                            sh "docker build -t livguard-stage:latest ."
                            } 
                    }
                    else if (env.BRANCH_NAME == 'main') {
                        withCredentials([string(credentialsId: '1b9711f1-d9cd-4518-9e8e-891f270dfdfd', variable: 'DockerCredentials')]) {
                            sh "docker login -u growthjockey -p ${DockerCredentials}"
                            sh "docker build -t livguard-prod:latest ."
                            } 
                    }
                }
            }
        }
        
        stage('Pushing to ECR') {
            steps{
                script {
                    if (env.BRANCH_NAME == 'feature/livguard') {
                        sh "docker tag livguard-stage:latest 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-stage:${env.BUILD_ID}"
                        sh "docker push 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-stage:${env.BUILD_ID}"
                    } 

                    else if (env.BRANCH_NAME == 'main') {
                        sh "docker tag livguard-prod:latest 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-prod:${env.BUILD_ID}"
                        sh "docker push 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-prod:${env.BUILD_ID}"
                    }

                    //sh "docker tag ${IMAGE_REPO_NAME}:latest 048578456468.dkr.ecr.ap-south-1.amazonaws.com/growthjockey:${env.BUILD_ID}"
                    //sh "docker push 048578456468.dkr.ecr.ap-south-1.amazonaws.com/growthjockey:${env.BUILD_ID}"
                }
            }
        }

        stage('Deploy on k8') {
            steps {
              script{
                 if (env.BRANCH_NAME == 'feature/livguard') {
                        sshagent(['b6cb4788-6567-401f-b5d8-afc6e0892118'])  {
                         sh """ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-110-125-38.ap-south-1.compute.amazonaws.com 'sudo su'"""
                         sh """ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-110-125-38.ap-south-1.compute.amazonaws.com 'sudo docker rm -f \$(sudo docker ps -aq)'"""
                         sh """ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-110-125-38.ap-south-1.compute.amazonaws.com 'sudo docker pull 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-stage:$BUILD_ID'"""
                         sh """ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-110-125-38.ap-south-1.compute.amazonaws.com 'sudo docker run -d -p 3000:3000 --name livguard-container-$BUILD_ID 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-stage:$BUILD_ID'"""
                            //sh "docker pull 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-stage:$BUILD_ID"
                            //sh "sudo docker run -d -p 800:3000 --name livguard-container-$BUILD_ID 048578456468.dkr.ecr.ap-south-1.amazonaws.com/growthjockey:$BUILD_ID"
                            } 
                    }
                else if (env.BRANCH_NAME == 'main') {
                        sshagent(['b6cb4788-6567-401f-b5d8-afc6e0892118'])  {
                            sh """ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-110-125-38.ap-south-1.compute.amazonaws.com 'sudo su'"""
                            sh """ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-110-125-38.ap-south-1.compute.amazonaws.com 'sudo docker rm -f \$(sudo docker ps -aq)'"""
                            sh """ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-110-125-38.ap-south-1.compute.amazonaws.com 'sudo docker pull 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-prod:$BUILD_ID'"""
                            sh """ssh -o StrictHostKeyChecking=no ec2-user@ec2-3-110-125-38.ap-south-1.compute.amazonaws.com 'sudo docker run -d -p 3000:3000 --name livguard-container-$BUILD_ID 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-prod:$BUILD_ID'"""
                        }
                }


                            
                            //} 
                        //}
                //sh "sed -i s/TAG/${BUILD_ID}/g deployment.yml"
                //sshagent(['510bff66-357b-495d-b582-3bfa339135e6'])  {
                  //sh 'sudo yum install docker'
                  //sh 'aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 048578456468.dkr.ecr.ap-south-1.amazonaws.com' 
                  //sshagent(['b6cb4788-6567-401f-b5d8-afc6e0892118']) {
                    //sh 'sudo yum install docker'
                    //sh ' 
                  //sh 'sudo docker pull 048578456468.dkr.ecr.ap-south-1.amazonaws.com/growthjockey:158'
                  //sh 'sudo docker run -d -p 900:3000 --name livguard-container-demo 048578456468.dkr.ecr.ap-south-1.amazonaws.com/growthjockey:TAG'
                  //sh 'Docker pull 048578456468.dkr.ecr.ap-south-1.amazonaws.com/growthjockey:148'
                //sshagent(['5526d68b-d555-40e4-b64d-932a8439cfc1']) {
                //withKubeConfig(caCertificate: '', clusterName: 'minikube', contextName: 'minikube', credentialsId: '35abf961-eedc-4f3e-b8b7-5effb6ac90a6', namespace: 'default', restrictKubeConfigAccess: false, serverUrl: 'https://127.0.0.1:51883'){
                //sh 'kubectl apply -f deployment.yml --context=growthjockey@livguard.ap-south-1.eksctl.io'
                //withKubeConfig(caCertificate: '', clusterName: 'kube-master', contextName: '', credentialsId: '50cf6884-7b53-479d-b912-5dbc6808f9b8', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                    //sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'
                    //sh 'chmod u+x ./kubectl'
                    //sh 'sudo su - newUser'
               
               }
            }
        }
    }
}
