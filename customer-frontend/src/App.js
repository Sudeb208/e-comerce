import Home from './Component/container/Home/Home';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import CategoryProduct from './Component/container/categoryProduct/CategoryProduct';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/'  element={<Home />} />
                    <Route path='/:category'  element={<CategoryProduct name='sudeb' />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
