
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

1. React with Vite was used for its speed, minimal configuration, and fast hot-reload, which allowed focusing more on application logic and UI rather than tooling setup.
2. Material UI (MUI) was chosen to speed up development, maintain visual consistency, and leverage well-tested and accessible components without having to write custom CSS from scratch.
3. The application was structured into Pages (main views), Components (reusable UI pieces), Context and Utils to keep the code clean, maintainable, and scalable.
4. Axios was used for consuming the REST API because of its simplicity and clarity.
5. Pagination and filtering were implemented using API, allowing the frontend to request only the data it needs. This is more efficient than handling pagination and filtering entirely on the client side.
6. Vehicles are displayed as cards in a grid layout to better utilize screen space and improve readability. Showing only 10 vehicles per page avoids excessive scrolling and keeps the interface clean.
7. A Back to Home button was added to ensure the user always has a quick way to return to the main screen and avoid getting stuck in secondary views or forms.
8. The vehicle list refetches data from the API after each CRUD operation. While using global state (Context or Redux) could have enabled local updates without refetching, it was intentionally not used to prevent potential bugs with server-side pagination and data duplication, keeping the implementation simple and maintainable for this small-scope project.
9. Context was used to share the ability to show messages from anywhere within the code, improving the User Experience.

