import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const auth = window.localStorage.getItem('token'); 
    return auth ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
