  import { useState, useEffect } from 'react';
  import { Navigate, Outlet , useLocation} from 'react-router-dom';
  import { useAuthSelector } from './auth/Auth';
  import { Container } from '@mui/material';
  import PropTypes from 'prop-types';


  /**
 * PrivateRoute component to protect routes that require authentication.
 * Redirects unauthenticated users to the login page.
 */

  export const PrivateRoute = () => {
    const { user } = useAuthSelector();
    const auth = user.isAuthenticated;
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
      const checkAuth = async () => {
          // Simulate an authentication check
        setLoading(false);
      };
      checkAuth().then();
    }, []);

    if (loading) {
      // Show a loading indicator while checking authentication
      return <div>Loading...</div>;
    }

    if (auth && location.pathname === '/') {
      // Redirect authenticated users from the root to the customer page
      return <Navigate to="/customer" replace />;
    }

    // Render protected content or redirect to login
    return auth ? (
        <Container>
          <Outlet />
        </Container>
    ) : (
        <Navigate to="/login" replace />
    );
  };


  /**
 * PublicRoute component to handle routes that should only be accessible to unauthenticated users.
 * Redirects authenticated users to the customer page.
 */
  export const PublicRoute = ({ children }) => {
    const { user } = useAuthSelector();
    const isAuthenticated = user.isAuthenticated;
    return isAuthenticated ? <Navigate to="/customer" replace /> : children;
  };

  PublicRoute.propTypes = {
    children: PropTypes.node.isRequired
  };