import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';

const ProfilePage: React.FC = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("jwt"));
    const [validationMessage, setValidationMessage] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            const checkTokenValidity = async () => {
                try {
                    // Wait for the token validation to complete
                    const isValid = await AuthService.isTokenValid(token);
                    if (isValid) {
                        setValidationMessage("Token is valid.");
                    } else {
                        setValidationMessage("Token is invalid.");
                    }
                } catch (error) {
                    setValidationMessage("An error occurred while validating the token.");
                    console.error("Token validation failed:", error);
                }
            };
            checkTokenValidity();
        } else {
            setValidationMessage("No token found.");
        }
    }, [token]);

    return (
        <div>
            <h3>Token Validation Status</h3>
            {validationMessage ? (
                <p>{validationMessage}</p>
            ) : (
                <p>Validating token...</p>
            )}
        </div>
    );
};

export default ProfilePage;
