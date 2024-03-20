// Importing necessary hooks from React for state and context management
import { createContext, useContext, useState } from "react";

// Creating a Context object for authentication-related data and functions
const AuthContext = createContext();

// Custom hook for easier consumption of AuthContext throughout the application
export const useAuthSelector = () => useContext(AuthContext);

// The AuthProvider component that will wrap part of or the entire app to provide authentication state
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    // State to hold user information and authentication status
  const [user, setUser] = useState({ data: null, isAuthenticated: false });

    // Function to simulate user login
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // If the password is correct, set the user as authenticated
      if (password === "test123") {
        setUser({
          data: {
            email,
            // Extracting name from email for demonstration purposes
            name: `${email}`.split("@")[0],
          },
          isAuthenticated: true,
        });
        resolve("success");
      } else {
        // Reject the promise if the password is incorrect
        reject("Incorrect password");
      }
    });
  };


    // Function to log the user out
  const logout = () => {
    // Resetting the user state to its default values
    setUser({ data: null, isAuthenticated: false });
  };

  // Returning the Provider component from AuthContext with the current state and functions as its value
  // This allows any child component to access and use the authentication state and functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
