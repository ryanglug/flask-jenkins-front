 pipeline {
  agent none

  environment {
      IMAGE_NAME = 'ryanglug/flask-api-front'
      IMAGE_TAG = 'latest'
      DOCKER_USERNAME = credentials('dockerhub-user')
      DOCKER_PASSWORD = credentials('dockerhub-pass')
      BACKEND_API_URL = credentials('backend-api-url')
      VM_USER = credentials('vm-user')
      VM_IP = '20.90.166.46'
      CONTAINER_NAME = 'flask-api-front'
  }

  stages {
    stage('Build') {
      agent {
        label 'docker-agent'
      }
      steps {
         sh 'docker build --build-arg API_URL=$BACKEND_API_URL -t $IMAGE_NAME:$IMAGE_TAG .'
         sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD && docker push $IMAGE_NAME:$IMAGE_TAG'
      }
    }
    stage('Deploy') {
      agent {
        label 'jenkins-agent'
      }
      steps {
        sshagent(['ssh-key']) {
          sh '''
          ssh -o StrictHostKeyChecking=no $VM_USER@$VM_IP "
          docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD &&
          docker ps -q --filter name=$CONTAINER_NAME | xargs -r docker stop &&
          docker ps -aq --filter name=$CONTAINER_NAME | xargs -r docker rm && 
          docker images -q --filter reference=$IMAGE_NAME | xargs -r docker rmi &&
          docker pull $IMAGE_NAME:$IMAGE_TAG &&
          docker run -d --name $CONTAINER_NAME --network flask-api -p 2000:80 $IMAGE_NAME:$IMAGE_TAG
            "
          '''
        }
      }
    }
  }
}