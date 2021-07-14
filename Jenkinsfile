pipeline {
  
  environment {
    DOCKERHUB_cREDENTIALS = credentials('yotzash-dockerhub')
    dockerImage = ''
  }

  agent any
  
  stages {
    
    stage('Cloning Git') {
        steps {
            git 'https://github.com/yotzash/pigjenkins.git'
        }
    }
    stage('Checkout') {
        steps {
            checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/kovacsbenc3/my-first-repository.git']]])
        }
    }
    stage('Building image') {
        steps {
            script {
              dockerImage = docker.build registry + ":$BUILD_NUMBER"
            }
        }
    }
    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
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

  post {
    always {
      echo 'Finished'
    }
    success {
      echo 'Success'
    }
    failure {
      echo 'Failed'
    }
  }
}
}