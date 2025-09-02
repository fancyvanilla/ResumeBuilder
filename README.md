# 📄 Resume Builder — Full Stack Kubernetes App  

This repository hosts a **full-stack AI resume builder application** with **React frontend**, **Node.js backend**, and **Kubernetes deployment** automation.  

---

## ⚙️ Components  

- **Frontend** → React application for resume forms.  
- **Backend** → Node.js API server handling resume creation using Groq API.  
- **Helm** → Charts for deploying frontend, backend, autoscaling, and persistent volumes.  
- **CI/CD** → Runs SonarQube, installs dependancies, builds, runs Trivy scans, and deploys to Kubernetes.  

---

## 📂 Main Directories  

- `/client` → React application  
- `/server` → Node.js API server  
- `/mychart` → Helm charts for deployments (frontend, backend, autoscale, PVs)  
- `/.github/workflows` → Pipeline definitions (build, test, scan, deploy)  

---

## 🧾 Notes  

- Helm charts under `/mychart` include:
  - Frontend & backend deployments  
  - Autoscaling setup  
  - Persistent volume claims for storage
  PS: In values.yaml, you can include your specific values like image names, tags etc.
- CI/CD validates code quality (SonarQube), container security (Trivy), and pushes tagged images to the registry.  
- Docker images use `github.sha` for versioning and traceability.  
- Frontend and backend paths are tracked separately for image builds and deployments.  
- SonarCloud is used for static analysis; configuration is stored in `sonar-project.properties`.  
- The Kubernetes cluster is deployed locally, so GitHub Actions uses a local runner for Helm deployments.  

---

## 📌 Requirements  

- Node.js & npm  
- React  
- Kubernetes cluster accessible by Helm  
- Helm  
- Groq API credentials stored in `.env`  

---

### 💻 Run the App (for development)  

Run both frontend and backend in one command:  
```bash
npx concurrently "cd server && npm start" "cd client && npm start"
```


