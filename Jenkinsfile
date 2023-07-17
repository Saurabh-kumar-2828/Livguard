pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                script {
                    sshagent(['55d9c5d2-64af-4bcc-8229-40c145cadb5f']){
                        sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-13-232-242-194.ap-south-1.compute.amazonaws.com 'sudo su'"""
                        sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-13-232-242-194.ap-south-1.compute.amazonaws.com 'sudo /home/ubuntu/vpn-test/test-gj.sh'"""
                }
                }
            }
        }
 }
}
