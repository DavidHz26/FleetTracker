
# Vehicle Management App

A React 19 application for fleet tracking and vehicle lifecycle management. Built with focus on high-scalability architecture, performance, and secure configuration.

**Technical Goal** - This project demonstrates an optimized data-handling strategy where client-side memory consumption remains constant (O(1)) regardless of total records, thanks to an advanced Server-Side Pagination and Prefetching implementation.

## Features

- **CRUD Management**: Seamlessly create, read, update, and delete vehicle records with real-time UI synchronization.
- **Smart Data Fetching**: Powered by TanStack Query for efficient server-state management, including intelligent caching and automatic background updates.
- **Scalable Pagination & Filtering**: High-performance server-side processing using PostgreSQL to handle 1000+ records. Real-time filtering with search debouncing to minimize API load.
- **Optimized Navigation**: Integrated prefetching for paginated lists, ensuring near-instant page transitions and a smooth user experience by anticipating user actions.
- **Responsive & Accessible UI**: A card-based grid layout built with Material UI, fully optimized for mobile, tablet, and desktop screens with a focus on web accessibility (A11y).
- **Interactive Feedback**: Robust user notification system using Snapbars/Snackbars to provide immediate confirmation on all critical actions.
- **Cloud Infrastructure**: Integrated with Supabase (PostgreSQL) for secure persistent storage, utilizing Environment Variables and Row Level Security (RLS).

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
Create a .env file in the root directory and add your Supabase Credentials (refer to `.env.example` for the required format)
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

5. **Real World Database Integration - Supabase PostgreSQL** - Replaced initial mock data with a production-grade relational database. This ensures real data persistence, complex querying capabilities, and demonstrates how the application handles professional-level database scaling and indexing.

6. **Secure API Integration & RLS** -
 - Environment Variable Management - Used ```.env``` architecture to protect infrastructure details.
 - Public-Anon Security Model - Implemented Supabase's standard security layer, where the anon_key is safely exposed to the client to allow restricted API access. This is enforced by Row Level Security on the backend, ensuring that even with the key, data can only be accessed or modified through the application's intended logic.

### Performance & UX Optimizations

7. **Network Optimizations** -
- Server-Side Pagination & Filtering: Offloaded heavy data processing to the PostgreSQL engine, reducing client-side memory usage and ensuring instant responses even with 1000+ records.
- Debounced Search: Implemented via custom hooks to minimize unnecessary API calls and optimize server resources.
- Intelligent Prefetching: Leveraged Tanstack Query's prefetching to anticipate user navigation, effectively eliminating perceived latency despite dynamic URL parameters.

8. **Interactive Feedback** - Integrated Snackbars and disabled UI states during mutations (e.g., isDeleting) to prevent duplicate actions and provide clear user communication.

### State Management Strategy

9. **Targeted Context Usage** - React Context is used exclusively for global UI notifications (Alerts/Snackbars), demonstrating a mindful approach to state management by choosing the right tool for each specific scope.

### Quality Assurance & Automated Testing

10. **Vitest & React Testing Library** - Implemented a comprehensive suite of unit tests focusing on component reliability and user behavior, prioritizing testing success, loading, and error states (including server-side failures) to ensure the UI remains resilient and provides clear feedback under any network condition.
