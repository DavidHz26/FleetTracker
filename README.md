
# Vehicle Management App

A React application that allows users to manage a list of vehicles.
Users can view, filter, paginate, create, edit and delete vehicles using a mock REST API.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete vehicles
- **Pagination & Filtering**: Server-side pagination and real-time filtering
- **Responsive Design**: Card-based grid layout optimized for all screen sizes
- **Real-time Feedback**: Snackbar notifications for user actions
- **Mock API**: Full REST API simulation with json-server

## How to run the project

### Prerequisites

- Node.js (v18 or later recommended)
- Git (for cloning)

### Installation & Setup

1. **Clone the repository**
```
git clone <REPOSITORY_URL>
cd <PROJECT_FOLDER>
```

2. **Install dependencies**
```
npm install
```

3. **Start the mock API (json-server)**
# Install json-server globally if needed
```
npm install -g json-server
```

# Run the mock API
```
json-server --watch db.json --port 3001
```

# API will be available at: http://localhost:3001

4. Start the React development server
```
npm run dev
```
# App will be open at: http://localhost:5173

## Technical Decisions & Architecture

### Development Setup

1. **React 19 + Vite** - Choosen for fast setup, excellent developer experience with hot-reload, and optimal build performance, allowing focus on application logic rather than configuration.

### UI & Styling   
2. **Material UI (MUI)** -  Accelerated development with pre-built, accessible components while ensuring visual consistency and responsive design without extensive custom CSS.

### Project Structure
3. **Modular Architecture** - Organized into `Pages` (route-level views), `Components` (reusable UI), `Context` (global state), and `Utils` (helpers) for clean separation of concerns and maintainability.

### API Integration
4. **Axios + JSON-Server** -  Used Axios for clean API calls and JSON-Server to simulate RESTful backend with full CRUD, pagination and filtering capabilities.
5. **API-Driven Pagination/Filtering** - Implemented using JSON-Server's query parameters (`_page`, `_limit`, `q`) to practice real-world patterns where the frontend requests only needed data, avoiding client-side processing of large data.

### UI/UX Considerations
6. **Card-Based Grid Layout** - Vehicles displayed in responsive cards for optimal space usage and readability, with 10 items per page to balance information density and scrolling.
7. **Persistent Navigation** - "Back to Home" button ensures users always have cleaner exit points from forms or details views, improving navigation flow.

### State Management Strategy
8. **API as Source of Truth** - Vehicle data refetches after CRUD operations to maintain synchronization. Avoided global state (Context/Redux) for lists to prevent inconsistencies with paginated API response, keeping implementation simple and robust.
9. **Targeted Context Usage** - React Context exclusively manages global UI state (Snackbar notifications/alerts), demonstrating appropriate tool selection for specific problems.
