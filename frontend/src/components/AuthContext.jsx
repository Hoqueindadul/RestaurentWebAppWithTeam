import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUsername, setLoggedInUsername] = useState('');

    const login = (username) => {
        setLoggedInUsername(username);
    };

    const logout = () => {
        setLoggedInUsername('');
    };

    return (
        <AuthContext.Provider value={{ loggedInUsername, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
