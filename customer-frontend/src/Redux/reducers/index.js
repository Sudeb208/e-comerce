import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import userReducer from './user.reducer';
const rootReducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
});

export default rootReducers;
