import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./routes";
import { AuthProvider } from "./auth/Auth";
import { Navbar } from "./components/Navbar";
import CustomersPage from "./pages/Customers";
import LoginPage from "./pages/Login";
import SqlErrorsPage from "./pages/SqlErrors";


/**
 * App component that sets up the application's main structure, including routing and authentication.
 */

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
                <Route path="/customer" element={<CustomersPage />} />
                <Route path="/sql-errors" element={<SqlErrorsPage />} />
              </Route>
              {/* Route for the login page ("/login") */}
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
export default App;
