import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe(); 
    }, []);

    const logout = async () => {
        await signOut(auth); 
        setCurrentUser(null); 
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
