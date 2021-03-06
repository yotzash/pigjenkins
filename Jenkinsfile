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
          sh 'docker build -t yotzash/jenkinstest .'
        }
    }
    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push image') {
        steps {
          sh 'docker push yotzash/jenkinstest'
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
          sh 'docker run -d -p 8097:3000  -t yotzash/jenkinstest'
        }
    }
  }
}