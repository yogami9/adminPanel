import React from 'react';

/*This line imports the React library, which is necessary for building React components. React is usually imported since JSX (JavaScript XML) syntax requires it in every file where JSX is used. */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*This line imports components from the react-router-dom library, which is used for routing in React applications.
BrowserRouter is a component that uses the HTML5 history API to keep UI in sync with the URL.
Route is used to define a single route in the application.
Routes is a container for the Route components, managing the routes efficiently and allowing for nested routes. */
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement'; 
import ContentManagement from './pages/ContentManagement'; 
import SubscriptionManagement from './pages/SubscriptionManagement'; 

/*The following lines import specific components or pages from their respective file paths:
LoginForm: This is the component that will render when the user accesses the root path (/).
Dashboard: This component renders the dashboard page, accessible by the /dashboard path.
UserManagement, ContentManagement, and SubscriptionManagement: These components represent different management pages, nested within the dashboard. */

function App() {

  /*This declares a functional component named App. In React, functional components are a simpler way to create components using functions. */
  return (

    /*This is where the component starts to define what it will render. */
    <Router>

      
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UserManagement />} />
        <Route path="/dashboard/content" element={<ContentManagement />} />
        <Route path="/dashboard/subscriptions" element={<SubscriptionManagement />} />
      </Routes>
    </Router>
  );
}

export default App;

/*This component wraps all the routes and enables the routing functionality for the application. It establishes the context for routing, allowing components within it to access routing related hooks and functionalities. */

/*This is a container for <Route> components. It ensures that only one of the routes is rendered at a time based on the current URL. */

/*Each <Route> component defines a specific route and the component to render when the route matches:
<Route path="/" element={<LoginForm />} />: Renders the LoginForm component when the user visits the root URL (/).
<Route path="/dashboard" element={<Dashboard />} />: Renders the Dashboard component when the path is /dashboard.
<Route path="/dashboard/users" element={<UserManagement />} />: Renders the UserManagement component when the path is /dashboard/users.
<Route path="/dashboard/content" element={<ContentManagement />} />: Renders the ContentManagement component for the path /dashboard/content.
<Route path="/dashboard/subscriptions" element={<SubscriptionManagement />} />: Renders the SubscriptionManagement component when the path is /dashboard/subscriptions. */


/* This line exports the App component as the default export of the module, allowing it to be imported elsewhere in the application (usually in an index.js file or similar).*/