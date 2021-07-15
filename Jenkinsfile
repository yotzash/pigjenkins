pipeline {

  agent any
  
  environment {
    registry = 'yotzash-dockerhub/jenkinstest'
    registryCredential = 'yotzash-dockerhub'
    DOCKERHUB_CREDENTIALS = credentials('yotzash-dockerhub')
    dockerImage = ''
  }
  
  stages {
    
    stage('Cloning Git') {
        steps {
            git 'https://github.com/yotzash/pigjenkins.git'
        }
    }
    stage('Checkout') {
        steps {
            checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/yotzash/pigjenkins.git']]])
        }
    }
    stage('Building image') {
        steps {
            script {
              dockerImage = docker.build registry // + ":$BUILD_NUMBER"
            }
        }
    }
    stage('Deploy image') {
        steps {
          script {
            docker.withRegistry('', registryCredential) {
              dockerImage.push()
            }
          }
        }
    }
    stage('docker stop container') {
        steps {
          sh 'docker ps -f name=testContainer -q | xargs --no-run-if-empty docker container stop'
          sh 'docker container ls -a -fname=testContainer -q | xargs -r docker container rm'
         }
       }
    
    stage('Docker Run') {
        steps{
          script {
            dockerImage.run("-p 8096:3000 --rm --name testContainer")
          }
        }
    }
  }
}