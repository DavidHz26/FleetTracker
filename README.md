
# Vehicle Management App

A React application that allows users to manage a list of vehicles.
Users can view, filter, paginate, create, edit and delete vehicles using a mock REST API.

## How to run the project

### 1. Requirements

Make sure you have the following installed on your system:

Node.js (v18 or later recommended)
Download from: https://nodejs.org

You can verify it by running:

```
node -v
npm -v
```

### 2. Clone the repository

Using Git:

```
git clone <REPOSITORY_URL>
cd <PROJECT_FOLDER>
```

Or you can use GitHub Desktop if you prefer a visual interface to clone and open the repository.
Make sure you are inside the root folder of the project before continuing.

### 3. Install dependencies

In the project root folder, run:

```
npm install
```

This will install all the frontend dependencies required by the React app.

### 4. Start the API (json-server)

This project uses a local mock API powered by json-server and the file db.json.

If you don’t have json-server installed globally:

```
npm install -g json-server
```

Then, from the project root folder, run:

```
json-server --watch db.json --port 3001
```

This will start the API at:

http://localhost:3001

### 5. Start the front end

Open another terminal (keep json-server running) and run:

```
npm run dev
```

Vite will show you a local development URL, usually:

http://localhost:5173

Open the URL in your browser.

### 6. Done

You can now:

View the vehicles list
Filter & paginate
Add, edit and delete vehicles

All data is stored in db.json via the mock API.

## Technical notes and decisions

### Development Setup

1. **React 18 + Vite** - Choosen for fast setup, excellent developer experience with hot-reload, and optimal build performance, allowing focus con application logic rather than configuration.

### UI & Styling   
2. **Material UI (MUI)** -  Accelerated development with pre-built, accessible components while ensuring visual consistency and responsive design without extensive custom CSS.

### Project Structure
3. **Modular Architecture** - Organized into `Pages` (route-level views), `Components` (reusable UI), `Context` (global state), and `Utils` (helpers) for clean separation of concerns and maintanability.

### API Integration
4. **Axios + JSON-Server** -  Used Axios for clean API calls and JSON-Server to simulate RESTful backend with full CRUD, pagination and filtering capabilities.
5. **API-Driven Pagination/Filtering** - Implemented using JSON-Server's query parameters (`_page`, `_limit`, `q`) to practice real-world patterns where the frontend requests only needed data, avoiding client-side processiong of large data.

### UI/UX Considerations
6. **Card-Based Grid Layout** - Vehicles displayed in responsive cards for optimal space usage and readability, with 10 items per page to balance information density and scrolling.
7. **Persistent Navigation** - "Back to Home" button ensures users always have cleaner exit points from forms or details views, improving navigation flow.

### State Management Strategy
8. **API as Source of Truth** - Vehicle data refetches after CRUD operations to maintain synchronnization. Avoided global state (Context/Redux) for lists to prevent inconsistencies with paginated API response, keeping implementation simple and robust.
9. **Targeted Context Usage** - React Context exclusively manages global UI state (Snackbar notificacions/alerts), demonstrating appropiate tool selection for specific problems.
