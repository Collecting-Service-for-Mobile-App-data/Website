import { createContext, useContext, useState, useEffect } from "react";
import {setCookie, deleteCokkie, getCookie} from "./CookieUtils.jsx";
const AuthContext = createContext();
export const useAuthSelector = () => useContext(AuthContext);

// The AuthProvider component that will wrap part of or the entire app to provide authentication state
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    // State to hold user information and authentication status
  const [user, setUser] = useState({ data: null, isAuthenticated: false });

    const checkAuthStatus = () => {
        const token = getCookie("jwt");
        if (token) {
            fetchAdminStatus(token);
        }
    };

  useEffect(() => {
    checkAuthStatus();
  }, []);

    const fetchAdminStatus = (token) => {
        fetch('http://localhost:8080/api/user/sessionuser', {
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

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8080/api/user/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then(response => response.json())
                .then(data => {
                    setCookie("jwt", data.jwt);
                    fetchAdminStatus(data.jwt);
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
    deleteCokkie("jwt");
  };

  // Returning the Provider component from AuthContext with the current state and functions as its value
  // This allows any child component to access and use the authentication state and functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
