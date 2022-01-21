/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory } from '../../../Redux/actions';
import Layout from '../../layout/Layout';
import { useParams } from 'react-router-dom';
import './style.css';
import { genaratePublicUrl } from '../../../UrlConfig';

const CategoryProduct = props => {
    const { category } = useParams();
    const product = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductByCategory(category));
    }, [category]);

    const priceRange = {
        productUnder5k: 'under 5000',
        productUnder10k: 'under 10000',
        productUnder15k: 'under 15000',
        productUnder20k: 'under 2000',
        productUnder30k: 'under 30000',
        productUpper30k: 'upper 30000',
    };
    return (
        <>
            <Layout>
                <div className="card">
                    <div className="cardHeader">
                        <div>All Product</div>
                        <button>view all</button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {product.products.map(product => (
                            <div className="productContainer">
                                <div className="productImgContainer">
                                    <img
                                        src={genaratePublicUrl(
                                            product.productPicture[0].img,
                                        )}
                                        alt=""
                                    />
                                </div>
                                <div className="productInfo">
                                    <div style={{ margin: '10px 0' }}>
                                        {product.name}
                                    </div>
                                    <span>4.3</span>
                                    <span>3455</span>
                                    <div className="productPrice">
                                        {product.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>
                                    {category} {priceRange[key]}
                                </div>
                                <button>view all</button>
                            </div>
                            <div>
                                {product.productsByPrice[key].map(product => (
                                    <div className="productContainer">
                                        <div className="productImgContainer">
                                            <img
                                                src={genaratePublicUrl(
                                                    product.productPicture[0]
                                                        .img,
                                                )}
                                                alt=""
                                            />
                                        </div>
                                        <div className="productInfo">
                                            <div style={{ margin: '10px 0' }}>
                                                {product.name}
                                            </div>
                                            <span>4.3</span>
                                            <span>3455</span>
                                            <div className="productPrice">
                                                {product.price}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </Layout>
        </>
    );
};

export default CategoryProduct;
