/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPageProduct } from '../../../Redux/actions';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../UI/Card';
import { genaratePublicUrl } from '../../../UrlConfig';

function PageProduct({ params }) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getPageProduct(params));
    }, [params]);
    if (!products.productPage.title) {
        return <div>page not found</div>;
    }
    return (
        <div>
            <Carousel
                emulateTouch={true}
                infiniteLoop={true}
                showArrows={0}
                showThumbs={false}
                showIndicators={0}>
                {products.productPage.banners &&
                    products.productPage.banners.map((banner, index) => (
                        <div
                            key={index}
                            style={{ top: 0, width: '100vw', height: '50vh' }}>
                            <img
                                style={{ width: '100%', height: '100%' }}
                                src={banner.img}
                                alt=""
                            />
                        </div>
                    ))}
            </Carousel>
            {products.products.map(product => (
                <div key={product._id} className="productContainer">
                    <div className="productImgContainer">
                        <img
                            src={genaratePublicUrl(
                                product.productPicture[0].img,
                            )}
                            alt=""
                        />
                    </div>
                    <div className="productInfo">
                        <div style={{ margin: '10px 0' }}>{product.name}</div>
                        <span>4.3</span>
                        <span>3455</span>
                        <div className="productPrice">{product.price}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PageProduct;
