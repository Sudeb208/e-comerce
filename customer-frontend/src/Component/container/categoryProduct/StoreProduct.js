/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import { genaratePublicUrl } from '../../../UrlConfig';
import { Link } from 'react-router-dom';

const StoreProduct = props => {
    const product = useSelector(state => state.products);

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
            <div className="card">
                <div className="cardHeader">
                    <div>All Product</div>
                    <button>view all</button>
                </div>
                <div style={{ display: 'flex' }}>
                    {product.products.map(product => (
                        <Link
                            to={`/${product.slug}/${product._id}/p`}
                            style={{ display: 'block' }}
                            key={product._id}
                            className="productContainer">
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
                        </Link>
                    ))}
                </div>
            </div>

            {Object.keys(product.productsByPrice).map((key, index) => {
                return (
                    <div key={key} className="card">
                        <div className="cardHeader">
                            <div>
                                {props.category} {priceRange[key]}
                            </div>
                            <button>view all</button>
                        </div>
                        <div>
                            {product.productsByPrice[key].map(product => (
                                <Link
                                    to={`/${product.slug}/${product._id}/p`}
                                    style={{ display: 'block' }}
                                    className="productContainer">
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
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default StoreProduct;
