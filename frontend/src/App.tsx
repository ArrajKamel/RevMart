import { useState, useEffect } from 'react';
import './App.css';
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { AuthService } from "./services/AuthService";

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
        const checkTokenValidity = async () => {
            if (token) {
                try {
                    const isValid = await AuthService.isTokenValid(token);
                    setIsAuthenticated(isValid);
                } catch (error) {
                    setIsAuthenticated(false);
                    console.error('Token validation failed:', error);
                }
            }
            setLoading(false);
        };
  
        checkTokenValidity();
    }, [token]);
  
    if (loading) {
        return <div>Loading...</div>;
    }
  
    return <RouterProvider router={router(isAuthenticated)} />;
};

export default App;