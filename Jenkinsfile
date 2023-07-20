pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'staging') {
                        sshagent(['55d9c5d2-64af-4bcc-8229-40c145cadb5f']){
                            sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-43-204-40-59.ap-south-1.compute.amazonaws.com 'sudo su'"""
                            sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-43-204-40-59.ap-south-1.compute.amazonaws.com 'sudo /home/ubuntu/vpn-test/test-gj.sh'"""
                }
                }
                    else if (env.BRANCH_NAME == 'prod') {
                        sshagent(['0b24b3d1-83bf-4849-a1d6-0f44be00f76b']) {
                            sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-15-206-25-181.ap-south-1.compute.amazonaws.com 'sudo su'"""
                            sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-15-206-25-181.ap-south-1.compute.amazonaws.com 'mkdir pipeline-test'"""
                            //sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-15-206-25-181.ap-south-1.compute.amazonaws.com 'sudo /home/ubuntu/vpn-test/test-gj.sh'"""
                        
            }
        }
 }
}
