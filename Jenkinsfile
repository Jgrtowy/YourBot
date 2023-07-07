pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        checkout scm
        sh 'npm install'
      }
    }
    stage('Deploy') {
      steps {
        sh 'npm start'
      }
    }
  }
  tools {
    nodejs 'Node18'
  }
}
