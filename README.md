# 🚀 Neon Snake Arena – End-to-End DevSecOps on AWS EKS

An end-to-end DevSecOps project that deploys the **Neon Snake Arena** game on **AWS EKS** using Terraform, Jenkins, ArgoCD, and other modern DevSecOps tools.

This project demonstrates full CI/CD pipelines, infrastructure as code, containerized deployments, and security scanning.

---

## 📌 Project Overview

This project allows you to:

✅ Provision AWS infrastructure (EC2, EKS) with Terraform
✅ Deploy Jenkins servers and pipelines for CI/CD automation
✅ Deploy and manage containerized applications on Kubernetes (Neon Snake Arena)
✅ Integrate security and code quality tools: Trivy, OWASP Dependency-Check, SonarQube
✅ Automate deployments with ArgoCD

---

## 🛠 Tech Stack

* **Infrastructure:** Terraform, AWS (EKS, EC2, S3)
* **CI/CD:** Jenkins pipelines
* **CD & GitOps:** ArgoCD
* **Containerization:** Docker
* **Security:** Trivy, OWASP Dependency-Check, SonarQube
* **Orchestration:** Kubernetes (EKS)
* **Game App:** Neon Snake Arena (V1 & V2)

---

## 📂 Project Structure

```
K8-DEVSECOPS-NEONSNAKEARENA-AWS-TF/
│
├── AWS-EKS-Cluster-Terraform/       # Terraform scripts for EKS cluster
├── Jenkins-Pipelines/               # Jenkins pipeline configurations
├── Jenkins-Server-Terraform/        # Terraform scripts to deploy Jenkins EC2 servers
├── Manifest-file/                   # Kubernetes manifests for Neon Snake Arena
├── Neon-Snake-Arena-V1/             # Initial version of the game
└── Neon-Snake-Arena-V2/             # Enhanced version of the game
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/AmanPathak-DevOps/K8-DEVSECOPS-NEONSNAKEARENA-AWS-TF.git
cd K8-DEVSECOPS-NEONSNAKEARENA-AWS-TF
```

---

### 2️⃣ Terraform Infrastructure

Navigate to the Terraform directories to provision infrastructure:

```bash
cd AWS-EKS-Cluster-Terraform
terraform init
terraform plan
terraform apply
```

For Jenkins servers:

```bash
cd Jenkins-Server-Terraform
terraform init
terraform apply
```

---

### 3️⃣ Jenkins Pipelines

* Open Jenkins at `http://<jenkins-server-ip>:8080`
* Import the pipelines from `Jenkins-Pipelines/`
* Configure AWS credentials and pipeline environment variables

---

### 4️⃣ Deploy Neon Snake Arena on EKS

* Use the manifests in `Manifest-file/`
* Apply with `kubectl apply -f <manifest>` or automate via Jenkins pipelines

---

### 5️⃣ Optional: Continuous Deployment with ArgoCD

* Connect ArgoCD to the Kubernetes cluster
* Sync manifests for automated GitOps-based deployments

---

## 📡 CI/CD & Security Features

| Feature                  | Tool                   |
| ------------------------ | ---------------------- |
| CI/CD Pipelines          | Jenkins                |
| Continuous Deployment    | ArgoCD                 |
| Infrastructure as Code   | Terraform              |
| Containerization         | Docker                 |
| Kubernetes Orchestration | EKS                    |
| Vulnerability Scanning   | Trivy                  |
| Dependency Security      | OWASP Dependency-Check |
| Code Quality             | SonarQube              |

---

## 🎯 Project Highlights

* Fully automated **end-to-end DevSecOps pipeline**
* **Infrastructure as Code** with Terraform for repeatable environments
* **Secure container deployments** with Trivy and OWASP scans
* **GitOps-style continuous deployment** using ArgoCD
* Hands-on experience with **modern DevSecOps tools** in a real project

---

## 🔒 Security Notes

⚠ Never commit:

* AWS credentials or secrets
* Terraform state files with sensitive info
* Jenkins credentials
* `.env` files

---

## 👨‍💻 Author

**Name:** Vipun Sanjana (Software Engineer)
**GitHub:** [https://github.com/vipunsanjana](https://github.com/vipunsanjana)
**LinkedIn:** [https://www.linkedin.com/in/vipun/](https://www.linkedin.com/in/vipun/)

---

## ⭐ Support

If you find this project useful:

⭐ Star the repo
🍴 Fork it
🧠 Contribute or suggest improvements

---
