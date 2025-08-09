import React, {createContext, useState, useEffect, useContext} from "react";


const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(userId) {
            setCurrentUser(userId)
        }
    }, []);
    const value = {
        currentUser, setCurrentUser
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}