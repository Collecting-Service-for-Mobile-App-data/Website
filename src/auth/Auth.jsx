import { createContext, useContext, useState, useEffect } from "react";
import {setCookie, deleteCokkie, getCookie} from "./CookieUtils.jsx";


const AuthContext = createContext();

/**
 * Custom hook to access the authentication context.
 */
export const useAuthSelector = () => useContext(AuthContext);


/**
 * AuthProvider component that wraps part or the entire app to provide authentication state.
 * @param {Object} props - The children components to be wrapped by the provider.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ data: null, isAuthenticated: false });


   /**
   * Checks the authentication status by retrieving the JWT token from cookies.
   */
    const checkAuthStatus = () => {
        const token = getCookie("jwt");
        if (token) {
            fetchAdminStatus(token);
        }
    };

  useEffect(() => {
    checkAuthStatus();
  }, []);


   /**
   * Fetches the admin status of the user using the provided JWT token.
   * @param {string} token - JWT token for authentication.
   */
    const fetchAdminStatus = (token) => {
        fetch('http://129.241.153.179:8080/api/user/sessionuser', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.admin) {
                    setUser({ isAuthenticated: true });
                } else {
                    logout();
                }
            })
            .catch(() => {
                logout();
            });
    };


    /**
   * Logs in the user by authenticating with the server and setting the JWT token in cookies.
   * @param {string} email - User's email.
   * @param {string} password - User's password.
   * @returns {Promise} - Resolves on successful login, rejects with error message on failure.
   */
    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            fetch('http://129.241.153.179:8080/api/user/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => reject(text));
                    }
                    return response.json();
                })
                .then(data => {
                    setCookie("jwt", data.jwt);
                    fetchAdminStatus(data.jwt);
                    resolve("success");
                })
        });
    };


     /**
   * Logs out the user by clearing the user state and deleting the JWT token from cookies.
   */
  const logout = () => {
    setUser({ data: null, isAuthenticated: false });
    deleteCokkie("jwt");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
