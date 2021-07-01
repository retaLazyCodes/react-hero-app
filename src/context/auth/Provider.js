import AuthContext from "./index";
import { useState } from "react";


export default function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(false)

    const handleLogin = (token) => {
        setUserToken(true);
        localStorage.setItem("@superhero-token", JSON.stringify(token))
    }

    const handleLogout = () => {
        setUserToken(false);
        localStorage.removeItem("@superhero-token")
    }

    const checkAuth = () => userToken;

    return (
        <AuthContext.Provider value={
            {
                isAuthenticated: checkAuth,
                onLogin: handleLogin,
                onLogout: handleLogout,
            }
        }>
            {children}
        </AuthContext.Provider>
    );
}