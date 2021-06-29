import AuthContext from "./index";
import { useState } from "react";


export default function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(false)

    const handleLogin = () => setUserToken(true);

    const handleLogout = () => setUserToken(false);

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