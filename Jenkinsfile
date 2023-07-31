pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'staging') {
                        sshagent(['f74f1a2f-5c3d-49e4-a0e5-646f8d9e87ea']){
                            sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-43-204-40-59.ap-south-1.compute.amazonaws.com 'sudo su'"""
                            sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-43-204-40-59.ap-south-1.compute.amazonaws.com 'sudo /home/ubuntu/vpn-test/test-gj.sh'"""
                }
                }
                    else if (env.BRANCH_NAME == 'prod') {
                        sshagent(['f74f1a2f-5c3d-49e4-a0e5-646f8d9e87ea']) {
                            sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-15-206-25-181.ap-south-1.compute.amazonaws.com 'sudo su'"""
                            sh """ssh -o StrictHostKeyChecking=no ubuntu@ec2-15-206-25-181.ap-south-1.compute.amazonaws.com 'sudo /home/ubuntu/vpn/test.sh'"""
                        
            }
        }
 }
}
        }
    }
}
