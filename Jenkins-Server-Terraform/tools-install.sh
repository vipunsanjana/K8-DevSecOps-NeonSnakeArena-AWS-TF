#!/bin/bash

echo "========== Updating APT repositories =========="
sudo apt update

echo "========== Installing Java (OpenJDK 21) =========="
sudo apt install fontconfig openjdk-21-jre -y
java --version

echo "========== Installing Jenkins =========="
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

echo "Adding Jenkins repository..."
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y
echo "Jenkins installed successfully."

echo "========== Installing Docker =========="
sudo apt update
sudo apt install docker.io -y
sudo usermod -aG docker jenkins
sudo usermod -aG docker ubuntu
sudo systemctl restart docker
sudo chmod 777 /var/run/docker.sock
echo "Docker installed and configured successfully."

echo "========== Running SonarQube in Docker =========="
docker run -d --name sonarqube -p 9000:9000 sonarqube:community
echo "SonarQube container started."

echo "========== Installing Terraform =========="
sudo apt install unzip -y
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint
echo "Adding Terraform repository..."
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update
sudo apt-get install terraform -y
echo "Terraform installed successfully."

echo "========== Installing Kubectl =========="
curl -LO https://dl.k8s.io/release/v1.33.5/bin/linux/amd64/kubectl
curl -LO https://dl.k8s.io/release/v1.33.5/bin/linux/amd64/kubectl.sha256
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
echo "Kubectl installed successfully."

echo "========== Installing AWS CLI v2 =========="
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
echo "AWS CLI installed successfully."

echo "========== Installing Trivy =========="
sudo apt-get install wget gnupg -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy -y
trivy --version
echo "Trivy installed successfully."

echo "========== Setup Complete =========="
