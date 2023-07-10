pipeline {
  agent any

  stages {
    stage('Installing dependencies') {
      steps {
        checkout scm
        sh 'npm install'
        script{
            currentBuild.result = 'SUCCESS'
        }
      }
    }
    stage('Running the bot'){
        steps{
            sh 'node main.js'
        }
    }
  }
  tools {
    nodejs 'Node18'
  }
}
