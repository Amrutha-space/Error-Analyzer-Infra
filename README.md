# AutoInfra - Intelligent Error Debugger

A minimal full-stack developer debugging assistant that analyzes technical errors and logs to provide structured debugging guidance.

## Project Structure

```
AutoInfra/
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           └── java/
│               └── com/
│                   └── autoinfra/
│                       ├── AutoInfraApplication.java
│                       ├── controller/
│                       │   └── AnalysisController.java
│                       └── service/
│                           └── AnalysisService.java
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        └── index.css
```

## Live Link 

https://error-analyzer-infra.vercel.app


## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Node.js 16 or higher
- npm or yarn

## Mac Run Instructions

### 1. Start the Backend

Open terminal and navigate to the backend directory:

```bash
cd AutoInfra/backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 2. Start the Frontend

Open a NEW terminal and navigate to the frontend directory:

```bash
cd AutoInfra/frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### 3. Access the Application

Open your browser and go to `http://localhost:3000`

## API Endpoint

**POST** `/api/analyze`

Request:
```json
{
  "log": "string"
}
```

Response:
```json
{
  "rootCause": "...",
  "explanation": "...",
  "fix": "..."
}
```

## Features

- **Port Conflict Detection**: Identifies when ports are already in use
- **Java Exception Analysis**: Detects runtime exceptions
- **Docker Issues**: Identifies container-related problems
- **Build Failures**: Analyzes Maven/Gradle build errors
- **General Error Analysis**: Provides fallback analysis for unknown patterns

## Technology Stack

**Backend:**
- Java 17
- Spring Boot 3.2.0
- Maven
- Spring Web

**Frontend:**
- React 18
- Vite
- Plain JavaScript (no TypeScript)
- CSS (no UI libraries)
