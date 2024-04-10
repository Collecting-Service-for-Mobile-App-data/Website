// Importing necessary hooks from React for state and context management
import { createContext, useContext, useState, useEffect } from "react";
// Creating a Context object for authentication-related data and functions
const AuthContext = createContext();

// Custom hook for easier consumption of AuthContext throughout the application
export const useAuthSelector = () => useContext(AuthContext);

// The AuthProvider component that will wrap part of or the entire app to provide authentication state
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    // State to hold user information and authentication status
  const [user, setUser] = useState({ data: null, isAuthenticated: false });

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Assuming the presence of a token means the user is authenticated
      // This is a simplification. In a real app, you might want to verify the token's validity with the server
      setUser({ isAuthenticated: true });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

    // Function to simulate user login
  // Function to simulate user login with backend integration
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/api/user/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        // Correctly access the token using 'jwt' as per the backend's response structure
        console.log('Received token:', data.jwt);

        // Store the token for future requests using 'jwt'
        localStorage.setItem('authToken', data.jwt);

        // Update the user state
        setUser({
          data: {
            email,
          },
          isAuthenticated: true,
        });
        resolve("success");
      })
      .catch(error => {
        console.error('Login Error:', error);
        reject(error);
      });
    });
  };

  const logout = () => {
    setUser({ data: null, isAuthenticated: false });
    localStorage.removeItem('authToken');
  };

  // Returning the Provider component from AuthContext with the current state and functions as its value
  // This allows any child component to access and use the authentication state and functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
