import React, { ReactNode } from 'react';
import { useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store'; // Import your RootState type from the store

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {


    const token = useSelector((state: RootState) => state.users.user.token);

    if (!token) {
        // If no token is found, redirect to login
        return <Navigate to="/login" replace />;
    }

    // If token exists, render the protected page
    return <>{children}</>;
};

export default ProtectedRoute;
