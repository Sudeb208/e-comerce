/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/container/Home';
import Signup from './component/container/Signup';
import Signin from './component/container/Singin';
import Product from './component/container/Products';
import { isUserLoggedIn } from './Store/actions/auth.action';
import Order from './component/container/order';
import Category from './component/container/Category';
import PrivateRouteDefferentWay from './component/HOC/PrivateRouteWithDefferentWay';
import PrivateRoute from './component/HOC/PrivateRoute';
import { getInitialData } from './Store/actions/initialData.action';
import NewPage from './component/container/newPage';

/* eslint-disable react/react-in-jsx-scope */
function App() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const authenticate = auth.authenticate
    
    console.log(auth);
    useEffect(() => {
        if (auth.authenticate !== true) {
            console.log(auth);
            dispatch(isUserLoggedIn());
        }
        if (auth.authenticate) {
            dispatch(getInitialData());
        }
    }, [auth.authenticate]);
   
    // useEffect(() => {
    //     dispatch(getAllCategory());
    // }, [Category]);
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/*" element={<PrivateRouteDefferentWay />}>
                        <Route path="product" element={<Product />} />
                        <Route path="page" element={<NewPage />} />
                        <Route path="orders" element={<Order />} />
                        <Route path="category" element={<Category />} />
                    </Route>
                    <Route path="/sign-in" element={<Signin />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="*" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
