// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null); // Add userId state
    
console.log('User ID:', userId);

    return (
        <AuthContext.Provider value={{ email, setEmail, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
