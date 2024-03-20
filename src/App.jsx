// Import necessary hooks and components from React and React Router
import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import the PrivateRoute component for protected routes
import { PrivateRoute } from "./routes";
// Import the AuthProvider component to wrap the app and provide authentication context
import { AuthProvider } from "./auth/Auth";
// Import the Navbar component to display a navigation bar across the application
import { Navbar } from "./components/Navbar";


// Import page components for different routes
import CustomersPage from "./pages/Customers";
import LoginPage from "./pages/Login";
import SqlErrorsPage from "./pages/SqlErrors";

function App() {
  // The return statement defines the component's rendered output
  return (
    <div className="App">
      <AuthProvider>
         {/* AuthProvider wraps the entire application to provide authentication state */}
        <BrowserRouter>
         {/* BrowserRouter wraps the application to enable client-side routing */}
          <Fragment>
            {/* Navbar is placed outside Routes to ensure it's always visible */}
            <Navbar />
            {/* Routes define the application's navigation structure */}
            <Routes>
              {/* Route for the homepage ("/") is wrapped in PrivateRoute to require authentication */}
              <Route exact path="/" element={<PrivateRoute />}>
                {/* Nested routes under the homepage for specific pages */}
                <Route path="" element={<CustomersPage />} />
                <Route path="sql-errors" element={<SqlErrorsPage />} />
              </Route>
              {/* Route for the login page ("/login") */}
              <Route exact path="/login" element={<LoginPage />} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

// Export the App component for use in the application
export default App;
