import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loggedInUsername, setLoggedInUsername] = useState(null); // Track the logged-in username

    // Check localStorage for JWT token on app load
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        const username = localStorage.getItem("username"); // Retrieve username
        if (token && username) {
            setIsAuthenticated(true); // If token and username exist, the user is authenticated
            setLoggedInUsername(username); // Set the logged-in username
        }
    }, []);

    const login = (username, token) => {
        setIsAuthenticated(true);
        setLoggedInUsername(username); // Store username after login
        localStorage.setItem("jwt", token); // Save the JWT token to localStorage
        localStorage.setItem("username", username); // Save username to localStorage
    };

    const logout = () => {
        localStorage.removeItem("jwt"); // Remove the JWT token
        localStorage.removeItem("username"); // Remove the username from localStorage
        setIsAuthenticated(false);
        setLoggedInUsername(null); // Reset the logged-in username
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loggedInUsername, login, logout, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
;
