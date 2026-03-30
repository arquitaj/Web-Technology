# Web-Technology - Document Management System

A full-stack web application for managing and tracking documents within an organization, built with modern technologies and best practices.

## 🌐 Live Demo

**Deployed Application:** [https://www.raisesystemph.com/](https://www.raisesystemph.com/)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Document Management
- **Upload Documents**: Users can upload documents with categorization
- **Search & Filter**: Advanced search functionality for documents
- **Document Forwarding**: Route documents to relevant departments
- **Document Sharing**: Share documents with team members
- **Document Acknowledgment**: Track acknowledgment status of documents

### User Management
- **User Registration & Login**: Secure authentication with JWT & Google OAuth
- **Role-Based Access**: Employee and Admin roles with different permissions
- **User Dashboard**: Personalized dashboard for each user
- **Profile Management**: Update user information

### Notifications
- **Email Notifications**: Automated email alerts for document status changes
- **Real-time Updates**: Track incoming documents and assignments

### Admin Features
- **Employee Management**: Add, edit, and manage employees
- **Document Tracking**: View all documents and their status
- **Activity Monitoring**: Track user activities

## 🛠 Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite 7.2.4** - Build tool and dev server
- **React Router 7.13.0** - Client-side routing
- **Bootstrap 5.3.8** - Responsive UI components
- **Axios 1.13.4** - HTTP client
- **Firebase 12.10.0** - Authentication and cloud services
- **Lucide React 0.563.0** - Icon library

### Backend
- **Express.js 5.2.1** - Web framework
- **TypeScript** - Type-safe backend development
- **Firebase 12.10.0** - Authentication and database
- **MongoDB/Mongoose 9.1.6** - NoSQL database
- **Bcrypt 6.0.0** - Password hashing
- **JWT** - Token-based authentication
- **Nodemailer 8.0.2** - Email service
- **Multer 2.0.2** - File upload handling
- **Helmet 8.1.0** - Security middleware
- **CORS 2.8.6** - Cross-origin requests

## 📁 Project Structure

```
Web-Technology/
├── client/                          # Frontend application
│   ├── src/
│   │   ├── app/                    # Main app component
│   │   ├── features/
│   │   │   └── components/
│   │   │       ├── dashboard/      # Dashboard components
│   │   │       ├── documents/      # Document management
│   │   │       ├── employees/      # Employee management
│   │   │       └── mydocuments/    # User documents
│   │   ├── Pages/                  # Page components
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── layout/         # Navbar, Sidebar
│   │   │       └── ui/             # Reusable UI components
│   │   └── assets/
│   │       └── styles/             # CSS stylesheets
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── server/                          # Backend application
    ├── controllers/                 # Route handlers
    │   ├── auth.controller.ts
    │   ├── document.controller.ts
    │   ├── user.controller.ts
    │   ├── email.controller.ts
    │   ├── credentials.controller.ts
    │   └── acknowledgement.controller.ts
    ├── models/                      # Database models
    │   ├── user.model.ts
    │   ├── document.model.ts
    │   ├── forwarding.model.ts
    │   └── acknowledgement.model.ts
    ├── routes/                      # API routes
    │   ├── auth.routes.ts
    │   ├── document.routes.ts
    │   ├── user.routes.ts
    │   ├── email.routes.ts
    │   └── index.ts
    ├── middleware/
    │   └── security.ts              # Security middleware
    ├── config/
    │   ├── database.ts              # Database configuration
    │   └── firebase.ts              # Firebase setup
    ├── server.ts                    # Main server file
    └── package.json
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** (package manager)
- **MongoDB** (local or cloud instance)
- **Firebase Project** (for authentication and cloud services)
- **Git** (for version control)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Web-Technology
```

### 2. Backend Setup

```bash
cd server
npm install
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/document-management
NODE_ENV=development

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

### Frontend Configuration

Create a `.env` file in the `client` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Backend Server

```bash
cd server
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Terminal 2 - Frontend Application

```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Production Build

#### Backend
```bash
cd server
npm start
```

#### Frontend
```bash
cd client
npm run build
npm run preview
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /verify-token` - Verify JWT token

### User Routes (`/api/users`)
- `GET /` - Get all users (Admin only)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user profile
- `DELETE /:id` - Delete user (Admin only)

### Document Routes (`/api/documents`)
- `GET /` - Get all documents
- `GET /:id` - Get document by ID
- `POST /` - Upload new document
- `PUT /:id` - Update document
- `DELETE /:id` - Delete document
- `POST /:id/forward` - Forward document
- `POST /:id/share` - Share document

### Email Routes (`/api/emails`)
- `POST /send` - Send email notification
- `POST /bulk-send` - Send bulk emails

### Acknowledgement Routes (`/api/acknowledgements`)
- `POST /` - Create acknowledgement
- `PUT /:id` - Update acknowledgement status
- `GET /` - Get acknowledgements

## 🔐 Environment Variables

### Server Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/db` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `JWT_SECRET` | Secret key for JWT | Random string |
| `FIREBASE_*` | Firebase credentials | From Firebase console |
| `EMAIL_USER` | Email sender address | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Email app password | Application specific password |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Client Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000` |
| `VITE_FIREBASE_*` | Firebase configuration | From Firebase console |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | From Google Console |

## 🗄️ Database Setup

### MongoDB Setup

1. **Local MongoDB**
   ```bash
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas (Cloud)**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database and get connection string
   - Update `MONGODB_URI` in `.env`

### Collections

The application uses the following MongoDB collections:

- **users** - User account information
- **documents** - Document records
- **forwarding** - Document forwarding history
- **acknowledgements** - Document acknowledgment tracking
- **credentials** - User credentials storage

## 📝 Contributing

### Guidelines

1. Create a new branch for each feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Add your feature description"
   ```

3. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request with a clear description

### Code Standards

- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before pushing

### Running Linter

```bash
cd client
npm run lint
```

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Support

For issues, questions, or suggestions, please:

1. Check existing issues on GitHub
2. Create a new issue with detailed description
3. Contact the development team

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Vite Documentation](https://vitejs.dev)

---

**Last Updated:** March 2026

**Version:** 1.0.0

