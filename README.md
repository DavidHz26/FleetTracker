
# Vehicle Management App

A React 19 application for fleet tracking and vehicle lifecycle management. Built with focus on performance, clean architecture and secure configuration.

## Features

- **CRUD Management**: Seamlessly create, read, update, and delete vehicle records with real-time UI synchronization.
- **Smart Data Fetching**: Powered by TanStack Query for efficient server-state management, including intelligent caching and automatic background updates.
- **Pagination & Filtering**: High-performance server-side pagination and real-time filtering with search debouncing to minimize API load.
- **Optimized Navigation**: Integrated prefetching for paginated lists, ensuring near-instant page transitions and a smooth user experience.
- **Responsive & Accessible UI**: A card-based grid layout built with Material UI, fully optimized for mobile, tablet, and desktop screens with a focus on web accessibility (A11y).
- **Interactive Feedback**: Robust user notification system using Snapbars/Snackbars to provide immediate confirmation on all critical actions.
- **External REST API**: Integrated with MockAPI for persistent data storage, simulating a real-world production environment with environment-based configuration.

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

3. **Environment setup**
```
Create a .env file in the root directory and add your API URL (.env.example as a template)
```

4. **Start the React development server**
```
npm run dev
```
App will be available at: http://localhost:5173

## Technical Decisions & Architecture

### Development Setup

1. **React 19 + Vite** - Chosen for it's high-performance development server, hot-reload, and optimal build process, ensuring a modern and scalable foundation.

### UI & Styling   

2. **Material UI (MUI) & Accessibility** - Selected to ensure a consistent, accessible (A11y), and responsive design. I prioritized semantic HTML elements and MUI's ARIA support to guarantee a better experience for keyboard and screen-readers users.

### Project Structure

3. **Modular & Custom Hook Architecture** - Organized into Pages, Components, Hooks and Services. Encapsulating logic into dedicated hooks ensures a clean separation between UI components and data fetching logic.

### Data Management & API Integration

4. **TanStack Query (React Query) & Axios** - Integrated for robust asynchronous state management. This setup handles full CRUD operations, server-side pagination, and complex filtering with intelligent caching and background synchronization.

5. **Secure API Integration** - Used Environment Variable architecture (.env). This protects infrastructure details and follows professional deployment standards.

6. **Backend Simulation** - Selected MockAPI to provide a persistent, cloud-based RESTful API, allowing the application to be fully functional and testable in a production-like environment using Github Pages.

### Performance & UX Optimizations

7. **Network Optimizations** -
- Debounced Search: Implemented a delay via custom hooks to prevent API throttling.
- Smart Prefetching: While using TanStack Query optimistic updates was not possible because cache key limitations, opted to use a pre fetching solution to keep a fast navigation.

8. **Interactive Feedback** - Integrated Snackbars and disabled UI states during mutations (e.g., isDeleting) to prevent duplicate actions and provide clear user communication.

### State Management Strategy

9. **Targeted Context Usage** - React Context is used exclusively for global UI notifications (Alerts/Snackbars), demonstrating a mindful approach to state management by choosing the right tool for each specific scope.

### Quality Assurance & Automated Testing

10. **Vitest & React Testing Library** - Implemented a comprehensive suite of unit tests focusing on component reliability and user behavior, prioritizing testing success, loading, and error states (including server-side failures) to ensure the UI remains resilient and provides clear feedback under any network condition.
