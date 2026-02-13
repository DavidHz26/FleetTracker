
# Vehicle Management App

A React application that allows users to manage a list of vehicles.
Users can view, filter, paginate, create, edit and delete vehicles using a mock REST API.

## Features

- **CRUD Management**: Seamlessly create, read, update, and delete vehicle records with real-time UI synchronization.
- **Smart Data Fetching**: Powered by TanStack Query for efficient server-state management, including intelligent caching and automatic background updates.
- **Pagination & Filtering**: High-performance server-side pagination and real-time filtering with search debouncing to minimize API load.
- **Optimized Navigation**: Integrated prefetching for paginated lists, ensuring near-instant page transitions and a smooth user experience.
- **Responsive & Accessible UI**: A card-based grid layout built with Material UI, fully optimized for mobile, tablet, and desktop screens with a focus on web accessibility (A11y).
- **Interactive Feedback**: Robust user notification system using Snapbars/Snackbars to provide immediate confirmation on all critical actions.
- **Mock REST API**: A fully functional backend simulation with json-server, supporting real network requests and persistent data during the session.

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

3. **Run the mock API (json-server)**
```
npm run serve-json
```
API will be available at: 

http://localhost:3001

4. **Start the React development server**
```
npm run dev
```
App will be open at: 

http://localhost:5173

## Technical Decisions & Architecture

### Development Setup

1. **React 19 + Vite** - Chosen for fast setup, excellent developer experience with hot-reload, and optimal build performance, allowing focus on application logic rather than configuration.

### UI & Styling   
2. **Material UI (MUI) & Accessibility** - Chosen to ensure a consistent, accessible (A11y), and responsive design. Used semantic HTML elements and MUI's built-in ARIA support to provide a better experience for screen readers and keyboard navigation.

### Project Structure
3. **Modular & Custom Hook Architecture** - Organized into Pages, Components, Context, Utils, and a dedicated Hooks folder. Encapsulating TanStack Query logic into custom hooks (e.g., useGetVehicles, useDeleteVehicle) ensures reusable, testable, and clean code by separating UI from data fetching logic.

### API Integration
4. **TanStack Query (React Query) & Axios + JSON-Server** - Integrated TanStack Query for asynchronous state management. This setup handles full CRUD operations, server-side pagination, and filtering, providing a realistic production-grade data flow with intelligent caching and automatic background updates.
5. **Network Optimizations** -
Debounced Search: Implemented a 500ms delay via custom hooks to prevent API throttling.
Smart Prefetching: While using TanStack Query optimistic updates was not possible because cache key limitations, opted to use a pre fetching solution to keep a fast navigation.

### UI/UX Considerations
6. **Card-Based Grid Layout** - Vehicles displayed in responsive cards for optimal space usage and readability, with 10 items per page to balance information density and scrolling.
7. **UX Feedback & Loading States** - Integrated LoadingMessage components and disabled UI elements (like buttons) during mutations (e.g., isDeleting) to prevent duplicate actions and keep the user informed.

### State Management Strategy
8. **Targeted Context Usage** - React Context exclusively manages global UI state (Snackbar notifications/alerts), demonstrating appropriate tool selection for specific problems.
