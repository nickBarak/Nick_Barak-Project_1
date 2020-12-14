pipeline {
  agent any
  stages {
    stage('deploy') {
      when {
        branch 'master'
      }

      steps {
        sh 'rm -rf tomcat/webapps/client || true'
        sh 'cp -r build tomcat/webapps/client'
      }
    }
  }
}
