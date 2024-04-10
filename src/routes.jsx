  import { useState, useEffect } from 'react';
  import { Navigate, Outlet , useLocation} from 'react-router-dom';
  import { useAuthSelector } from './auth/Auth';
  import { Container } from '@mui/material';
  import PropTypes from 'prop-types';


  export const PrivateRoute = () => {
    const { user } = useAuthSelector();
    const auth = user.isAuthenticated;
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
      const checkAuth = async () => {
        setLoading(false);
      };
      checkAuth().then();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (auth && location.pathname === '/') {
      return <Navigate to="/customer" replace />;
    }

    return auth ? (
        <Container>
          <Outlet />
        </Container>
    ) : (
        <Navigate to="/login" replace />
    );
  };

  export const PublicRoute = ({ children }) => {
    const { user } = useAuthSelector();
    const isAuthenticated = user.isAuthenticated;
    return isAuthenticated ? <Navigate to="/customer" replace /> : children;
  };

  PublicRoute.propTypes = {
    children: PropTypes.node.isRequired
  };