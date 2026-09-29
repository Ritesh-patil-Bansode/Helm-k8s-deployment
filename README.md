# Hotel Management System

A full-stack Hotel Management System built using the MERN stack and deployed on AWS Kubernetes using Docker, Kubernetes, MongoDB StatefulSet, and Helm.

## Project Overview

The Hotel Management System is a web-based application that allows users to register, login, browse hotels, view hotel details, book hotels, and manage their bookings.

An admin can login to the system and manage hotels using CRUD operations.

The application follows a frontend-backend architecture with MongoDB as the database. The complete application is containerized using Docker and deployed on an AWS Kubernetes cluster. Helm is used to manage and deploy the complete Kubernetes application.

## Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* REST API

### Database

* MongoDB 7
* MongoDB Replica Set
* Kubernetes StatefulSet
* Persistent Volume Claims

### DevOps and Deployment

* Git
* GitHub
* Docker
* Docker Hub
* Kubernetes
* Helm
* AWS EC2
* AWS LoadBalancer
* Nginx

## Application Features

### User Features

* User registration
* User login
* JWT-based authentication
* Browse hotels
* Search hotels
* View hotel details
* Hotel images
* Book hotels
* View my bookings
* Cancel bookings
* Contact form
* Logout

### Admin Features

* Admin login
* Admin authentication
* Add hotels
* Update hotels
* Delete hotels
* View hotel data
* Manage hotel information

## Project Architecture

```text
                         AWS Kubernetes Cluster
                                  |
                    +-------------+-------------+
                    |                           |
                    v                           v
              Frontend Pods                Backend Pods
              React + Nginx                Node.js + Express
                    |                           |
                    |                           v
                    |                    MongoDB Service
                    |                           |
                    |                           v
                    |                    MongoDB StatefulSet
                    |                      /     |     \
                    |                     /      |      \
                    |                    v       v       v
                    |               mongo-0   mongo-1   mongo-2
                    |                  |         |         |
                    |                 PVC       PVC       PVC
                    |
                    v
              AWS LoadBalancer
```

## MVC Backend Architecture

The backend follows an MVC-style structure.

```text
Backend
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── bookingController.js
│   ├── contactController.js
│   └── hotelController.js
│
├── middleware
│   ├── adminMiddleware.js
│   └── authMiddleware.js
│
├── models
│   ├── Booking.js
│   ├── Contact.js
│   ├── Hotel.js
│   └── User.js
│
├── routes
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── contactRoutes.js
│   └── hotelRoutes.js
│
├── seed
│   └── seedHotels.js
│
├── .env
├── Dockerfile
├── package.json
└── server.js
```

## Frontend Structure

```text
Frontend
│
├── src
│   ├── components
│   │   ├── Hero.jsx
│   │   ├── HotelCard.jsx
│   │   ├── HotelGrid.jsx
│   │   ├── Navbar.jsx
│   │   └── SearchBar.jsx
│   │
│   ├── context
│   │   └── AuthContext.jsx
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Hotels.jsx
│   │   ├── HotelDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── MyBookings.jsx
│   │   ├── Contact.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── Dockerfile
├── package.json
└── vite.config.js
```

## Database Design

The application uses MongoDB with the following main collections:

```text
hotel_management
│
├── users
├── hotels
├── bookings
└── contacts
```

The `users` collection supports both users and administrators using a role field.

```text
User
├── name
├── email
├── password
└── role
```

Roles:

```text
user
admin
```

## MongoDB Kubernetes Deployment

MongoDB is deployed using a Kubernetes StatefulSet with three replicas.

```text
mongodb-0
mongodb-1
mongodb-2
```

A headless Kubernetes Service provides stable DNS names for the MongoDB pods.

```text
mongodb-0.mongodb:27017
mongodb-1.mongodb:27017
mongodb-2.mongodb:27017
```

MongoDB is configured as Replica Set `rs0`.

Each MongoDB pod has its own Persistent Volume Claim.

```text
MongoDB StatefulSet
       |
       +---- mongo-0 ---- PVC
       |
       +---- mongo-1 ---- PVC
       |
       +---- mongo-2 ---- PVC
```

## Dockerization

Both frontend and backend are containerized using Docker.

### Backend Docker Image

```text
riteshbansode/hotel-backend:1.2
```

Backend container:

```text
Node.js
   |
Express.js
   |
Port 5000
```

### Frontend Docker Image

```text
riteshbansode/hotel-frontend:1.0
```

Frontend container:

```text
React Build
    |
Nginx
    |
Port 80
```

## Kubernetes Deployment

The application is deployed on an AWS Kubernetes cluster.

Main Kubernetes resources:

```text
Frontend Deployment
Frontend Service

Backend Deployment
Backend Service

MongoDB StatefulSet
MongoDB Headless Service
Persistent Volume Claims
```

### Frontend

```text
Deployment: hotel-frontend
Replicas: 2
Port: 80
Service Type: LoadBalancer
```

### Backend

```text
Deployment: hotel-backend
Replicas: 2
Port: 5000
Service Type: LoadBalancer
```

### MongoDB

```text
StatefulSet: mongodb
Replicas: 3
Port: 27017
Service Type: Headless
Storage: 5Gi per pod
Replica Set: rs0
```

## Helm Deployment

Helm is used to package and manage the complete Kubernetes application.

Helm Chart:

```text
hotel-management
```

Chart structure:

```text
helm
└── hotel-management
    ├── Chart.yaml
    ├── values.yaml
    └── templates
        ├── backend-deployment.yaml
        ├── backend-service.yaml
        ├── frontend-deployment.yaml
        ├── frontend-service.yaml
        ├── mongodb-service.yaml
        └── mongodb-statefulset.yaml
```

## Helm Values

The main configurable values include:

```yaml
backend:
  replicas: 2
  port: 5000

frontend:
  replicas: 2
  port: 80

mongodb:
  replicas: 3
  port: 27017
  storage: 5Gi
```

This makes it possible to change replicas, Docker images, ports, and MongoDB storage without modifying the Kubernetes templates directly.

## Helm Commands

### Validate Helm Chart

```bash
helm lint ./helm/hotel-management
```

### Preview Kubernetes Manifests

```bash
helm template hotel-management ./helm/hotel-management
```

### Install Application

```bash
helm install hotel-management ./helm/hotel-management
```

### Upgrade Application

```bash
helm upgrade hotel-management ./helm/hotel-management
```

### Install or Upgrade

```bash
helm upgrade --install hotel-management ./helm/hotel-management
```

### Check Helm Release

```bash
helm status hotel-management
```

### List Helm Releases

```bash
helm list
```

### Package Helm Chart

```bash
helm package ./helm/hotel-management
```

Generated package:

```text
hotel-management-1.0.0.tgz
```

## Kubernetes Verification

Check all pods:

```bash
kubectl get pods
```

Check services:

```bash
kubectl get svc
```

Check deployments:

```bash
kubectl get deployments
```

Check StatefulSet:

```bash
kubectl get statefulset
```

Check PVCs:

```bash
kubectl get pvc
```

Check Helm release:

```bash
helm status hotel-management
```

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Hotels

```text
GET    /api/hotels
GET    /api/hotels/:id
POST   /api/hotels
PUT    /api/hotels/:id
DELETE /api/hotels/:id
```

### Bookings

```text
POST /api/bookings
GET  /api/bookings/my
PUT  /api/bookings/:id/cancel
```

### Contact

```text
POST /api/contact
GET  /api/contact
```

## Authentication

The application uses JWT-based authentication.

```text
User
 |
 | Login
 v
Backend
 |
 | Verify credentials
 v
JWT Token
 |
 v
Frontend
 |
 | Authorization: Bearer Token
 v
Protected APIs
```

Admin APIs additionally verify the user's role.

```text
JWT Authentication
       |
       v
Role Verification
       |
       +---- user
       |
       +---- admin
```

## Deployment Flow

The complete deployment process follows this flow:

```text
Developer
    |
    v
GitHub
    |
    v
Application Code
    |
    v
Dockerfile
    |
    v
Docker Image
    |
    v
Docker Hub
    |
    v
Kubernetes
    |
    +---- Frontend Deployment
    |
    +---- Backend Deployment
    |
    +---- MongoDB StatefulSet
    |
    v
Helm
    |
    v
AWS Kubernetes Cluster
    |
    v
AWS LoadBalancer
    |
    v
Application
```

## Project Deployment Workflow

### Step 1: Develop Application

```text
React Frontend
Node.js Backend
MongoDB Database
```

### Step 2: Build Docker Images

```bash
docker build -t riteshbansode/hotel-backend:1.2 ./Backend
docker build -t riteshbansode/hotel-frontend:1.0 ./Frontend
```

### Step 3: Push Images to Docker Hub

```bash
docker push riteshbansode/hotel-backend:1.2
docker push riteshbansode/hotel-frontend:1.0
```

### Step 4: Deploy MongoDB

```text
MongoDB StatefulSet
        |
        +---- mongo-0
        +---- mongo-1
        +---- mongo-2
```

### Step 5: Configure MongoDB Replica Set

```text
Replica Set Name: rs0
```

### Step 6: Deploy Application Using Helm

```bash
helm upgrade --install hotel-management ./helm/hotel-management
```

### Step 7: Verify Deployment

```bash
kubectl get pods
kubectl get svc
helm status hotel-management
```

## Current Deployment

The application is deployed on an AWS Kubernetes cluster with:

```text
Frontend Replicas: 2
Backend Replicas: 2
MongoDB Replicas: 3
MongoDB Storage: 5Gi per pod
```

Helm release:

```text
Name: hotel-management
Status: deployed
Chart Version: 1.0.0
App Version: 1.0
```

## Security

The project implements:

* JWT authentication
* Password hashing using bcryptjs
* Protected API routes
* Admin role-based authorization
* Kubernetes service separation
* Environment-based configuration
* `.env` excluded from Git using `.gitignore`

Sensitive credentials and secrets should not be committed to GitHub.

## Testing

The application was tested after deployment by:

* Checking frontend pods
* Checking backend pods
* Checking MongoDB StatefulSet
* Checking MongoDB replica set
* Testing authentication
* Testing hotel APIs
* Testing booking APIs
* Testing frontend-to-backend communication
* Verifying LoadBalancer services
* Verifying Helm deployment status

## DevOps Concepts Demonstrated

This project demonstrates practical knowledge of:

* Git
* GitHub
* Docker
* Docker Hub
* Dockerfile
* Multi-stage Docker builds
* Kubernetes
* Pods
* Deployments
* Services
* LoadBalancer
* StatefulSet
* Headless Service
* Persistent Volume Claims
* MongoDB Replica Set
* Configurations
* Environment Variables
* JWT Authentication
* Kubernetes application deployment
* Helm
* Helm Charts
* Helm Values
* Helm Templates
* Helm Packaging
* AWS Cloud Deployment

## Author

**Ritesh Bansode**

GitHub:

https://github.com/Ritesh-patil-Bansode

## Project Repository

https://github.com/Ritesh-patil-Bansode/Helm-k8s-deployment

## Conclusion

The Hotel Management System is a complete full-stack application that combines MERN development with practical DevOps and cloud deployment.

The project demonstrates the complete journey from application development to Docker containerization, Docker Hub image management, Kubernetes deployment, MongoDB StatefulSet and Replica Set configuration, AWS LoadBalancer exposure, and Helm-based application management.
