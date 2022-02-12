/* eslint-disable react-hooks/exhaustive-deps */
import Home from './Component/container/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryProduct from './Component/container/categoryProduct/CategoryProduct';
import { useEffect } from 'react';
import { isUserLoggedIn } from './Redux/actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetails from './Component/container/productDetails/ProductDetails';
import CartPage from './Component/container/CartPage/CartPage';
import { updateCart } from './Redux/actions/cart.action';
import CheckoutPage from './Component/container/CheckoutPage';

function App(props) {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    useEffect(() => {
        if (auth.authenticate !== true) {
            console.log(auth);
            dispatch(isUserLoggedIn());
        }
    }, [auth.authenticate]);
    useEffect(() => {
        dispatch(updateCart());
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/:category" element={<CategoryProduct />} />
                    <Route path="/:slug/:_id/p" element={<ProductDetails />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
