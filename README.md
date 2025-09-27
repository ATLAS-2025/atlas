# Atlas Planner

> A comprehensive full-stack application for campaign management, equipment tracking, and project coordination with advanced authentication, internationalization, and real-time monitoring capabilities.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Built With Next.js](https://img.shields.io/badge/Built%20with-Next.js-000?logo=nextdotjs)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🏗️ Architecture Overview

Atlas Planner is a modern full-stack application built with a microservices architecture, featuring:

- **Frontend**: Next.js 15 with TypeScript, internationalization, and modern UI components
- **Backend**: FastAPI with Python 3.11+, async capabilities, and comprehensive API documentation
- **Database**: PostgreSQL with SQLAlchemy 2.0+ and Alembic migrations
- **Authentication**: JWT-based authentication with role-based access control
- **Caching**: Redis for high-performance caching and session management
- **Background Tasks**: Celery for asynchronous task processing
- **Containerization**: Docker and Docker Compose for development and production

---

## 📁 Project Structure

```
atlas/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── app/             # App Router pages and layouts
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Feature-specific modules
│   │   ├── i18n/           # Internationalization
│   │   └── shared/         # Shared utilities and types
│   ├── public/             # Static assets
│   └── docs/               # Frontend documentation
├── backend/                 # FastAPI Python application
│   ├── api/                # API routes and endpoints
│   ├── core/               # Core application logic
│   ├── module/             # Business logic modules
│   ├── service/            # Service layer
│   ├── tests/              # Test suites
│   └── migrations/         # Database migrations
├── docker-compose.yaml     # Multi-service orchestration
└── README.md              # This file
```

---

## 🚀 Frontend (Next.js Application)

### **Technology Stack**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (100% type-safe)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Next-Auth v5 with JWT
- **Internationalization**: i18next with automated translation management
- **State Management**: Zustand + React Query
- **Testing**: Vitest + Playwright (unit, integration, e2e)
- **Desktop**: Electron integration for desktop applications

### **Key Features**

- 🌍 **Multi-language Support**: English, Russian, Kazakh with automated translation workflows
- 🔒 **Advanced Authentication**: JWT tokens, OAuth providers, role-based access
- 🎨 **Modern UI**: Beautiful, accessible components with dark/light mode
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts
- 🧪 **Comprehensive Testing**: Unit, integration, and end-to-end test coverage
- ⚡ **Performance Optimized**: Server-side rendering, code splitting, and caching
- 🔧 **Developer Experience**: Hot reload, TypeScript, ESLint, Prettier

### **Core Modules**

- **Campaign Management**: Create, monitor, and manage marketing campaigns
- **Equipment Tracking**: Asset management and equipment lifecycle tracking
- **People Management**: User profiles, roles, and permissions
- **Project Coordination**: Project planning, task management, and collaboration
- **Sensor Monitoring**: Real-time data collection and monitoring
- **Document Management**: File upload, storage, and organization

---

## ⚙️ Backend (FastAPI Application)

### **Technology Stack**

- **Framework**: FastAPI with Python 3.11+
- **Database**: PostgreSQL with SQLAlchemy 2.0+
- **Authentication**: JWT with bcrypt password hashing
- **Caching**: Redis for session management and caching
- **Background Tasks**: Celery for asynchronous processing
- **API Documentation**: Auto-generated OpenAPI/Swagger docs
- **Testing**: Pytest with async support
- **Code Quality**: Black, isort, pylint, mypy

### **Architecture Patterns**

- **Repository Pattern**: Clean separation of data access logic
- **Service Layer**: Business logic abstraction
- **Dependency Injection**: FastAPI's built-in DI system
- **Row-Level Security**: Granular permission control
- **Transaction Management**: Automatic commit/rollback handling

### **Core Modules**

#### **Authentication & Security**

- JWT token generation and validation
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Row-level security for data access
- Session management with Redis

#### **Business Modules**

- **Campaign Management**: Campaign lifecycle, scheduling, and analytics
- **Equipment Management**: Asset tracking, maintenance, and inventory
- **People Management**: User profiles, teams, and organizational structure
- **Project Management**: Project planning, task assignment, and progress tracking
- **Sensor Management**: IoT device integration and data collection
- **Document Management**: File storage, versioning, and metadata

#### **Infrastructure**

- **Database Migrations**: Alembic for schema versioning
- **Caching Layer**: Redis-based caching with TTL support
- **Background Workers**: Celery for async task processing
- **API Versioning**: Structured API versioning (v1, v2, etc.)
- **Error Handling**: Comprehensive exception management
- **Logging**: Structured logging with Loguru

---

## 🛠️ Development Setup

### **Prerequisites**

- Node.js >= 22.x
- Python 3.11+
- Docker & Docker Compose
- Poetry (Python dependency management)
- pnpm (Node.js package manager)

### **Quick Start**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ATLAS-2025/atlas.git
   cd atlas
   ```

2. **Start the infrastructure**:

   ```bash
   docker-compose up -d
   ```

3. **Backend Setup**:

   ```bash
   cd backend
   poetry install
   poetry shell
   make migrate
   make run
   ```

4. **Frontend Setup**:

   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```

5. **Access the applications**:
   - Frontend: <http://localhost:3000>
   - Backend API: <http://localhost:8000>
   - API Documentation: <http://localhost:8000/docs>

---

## 📊 API Documentation

The backend provides comprehensive API documentation:

- **Swagger UI**: Interactive API explorer at `/docs`
- **ReDoc**: Alternative documentation at `/redoc`
- **OpenAPI Schema**: Machine-readable spec at `/openapi.json`

### **API Endpoints Overview**

- `/api/v1/auth/` - Authentication and user management
- `/api/v1/campaigns/` - Campaign management operations
- `/api/v1/equipment/` - Equipment and asset management
- `/api/v1/people/` - User and team management
- `/api/v1/projects/` - Project coordination and tracking
- `/api/v1/sensors/` - Sensor data and monitoring
- `/api/v1/users/` - User profile and settings

---

## 🧪 Testing

### **Frontend Testing**

```bash
cd frontend
pnpm test          # Unit tests with Vitest
pnpm test:e2e      # End-to-end tests with Playwright
pnpm coverage      # Test coverage report
```

### **Backend Testing**

```bash
cd backend
make test          # Run all tests
make test-coverage # Generate coverage report
```

---

## 🚀 Deployment

### **Production Deployment**

- **Frontend**: Vercel, Netlify, or Docker containers
- **Backend**: Docker containers with Gunicorn
- **Database**: Managed PostgreSQL (AWS RDS, Google Cloud SQL)
- **Cache**: Managed Redis (AWS ElastiCache, Redis Cloud)

### **Docker Deployment**

```bash
docker-compose -f docker-compose.prod.yaml up -d
```

---

## 🔧 Development Tools

### **Code Quality**

- **Frontend**: ESLint, Prettier, TypeScript strict mode
- **Backend**: Black, isort, pylint, mypy
- **Git Hooks**: Pre-commit hooks for code quality

### **Internationalization**

- **Automated Translation**: Smart-i18n for translation management
- **Type Safety**: Auto-generated TypeScript types for translations
- **Supported Languages**: English, Russian, Kazakh (extensible)

---

## 📈 Performance & Monitoring

- **Frontend**: Next.js optimization, React Query caching, image optimization
- **Backend**: Async/await, connection pooling, Redis caching
- **Database**: Indexed queries, connection optimization
- **Monitoring**: Structured logging, health checks, metrics collection

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**

- Follow the existing code style and patterns
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏢 About Atlas Group

Atlas Planner is developed by Atlas Group, providing comprehensive solutions for campaign management, equipment tracking, and project coordination. For more information, visit [atlas-group.ai](https://atlas-group.ai).

**Contact**: <ohad.zangi@atlas-group.ai>

---

## 🙏 Acknowledgments

- FastAPI community for the excellent framework
- Next.js team for the powerful React framework
- All contributors and maintainers
- Open source libraries and tools used in this project
