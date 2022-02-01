import Home from './Component/container/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryProduct from './Component/container/categoryProduct/CategoryProduct';
import { useEffect } from 'react';
import { isUserLoggedIn } from './Redux/actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';

function App(props) {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    useEffect(() => {
        if (auth.authenticate !== true) {
            console.log(auth);
            dispatch(isUserLoggedIn());
        }
    }, [auth, dispatch]);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:category" element={<CategoryProduct />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
