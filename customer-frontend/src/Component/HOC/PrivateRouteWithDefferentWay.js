/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteDefferentWay = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/sign-in" />;
};
export default PrivateRouteDefferentWay;
