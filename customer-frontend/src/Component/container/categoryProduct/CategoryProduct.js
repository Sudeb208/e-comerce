/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Layout from '../../layout/Layout';
import './style.css';
import StoreProduct from './StoreProduct';
import { useLocation, useParams } from 'react-router-dom';
import searchParams from '../../../utilities/searchParams';
import PageProduct from './PageProduct';
import { useDispatch } from 'react-redux';
import { getProductByCategory } from '../../../Redux/actions/product.action';

const CategoryProduct = props => {
    const location = useLocation();
    const paramsObj = searchParams(location);
    const dispatch = useDispatch();
    const { category } = useParams();
    console.log(paramsObj);
    useEffect(() => {
        dispatch(getProductByCategory(category));
    }, [category]);
    console.log(category);
    return (
        <Layout>
            {paramsObj.type === 'store' ? (
                <StoreProduct category={category} />
            ) : (
                <PageProduct params={paramsObj} />
            )}
        </Layout>
    );
};

export default CategoryProduct;
