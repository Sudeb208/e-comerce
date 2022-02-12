// import React from 'react';
// import { genaratePublicUrl } from '../../UrlConfig';

// function Card(product) {
//     console.log(product);
//     return (
//         <div>
//             {product.products._id &&
//                 product.products.map(product => (
//                     <div key={product._id} className="productContainer">
//                         <div className="productImgContainer">
//                             <img
//                                 src={genaratePublicUrl(
//                                     product.productPicture[0].img,
//                                 )}
//                                 alt=""
//                             />
//                         </div>
//                         <div className="productInfo">
//                             <div style={{ margin: '10px 0' }}>
//                                 {product.name}
//                             </div>
//                             <span>4.3</span>
//                             <span>3455</span>
//                             <div className="productPrice">{product.price}</div>
//                         </div>
//                     </div>
//                 ))}
//         </div>
//     );
// }

// export default Card;
import React from 'react';
import './style.css';

/**
 * @author
 * @function Card
 **/

const Card = props => {
    return (
        <div className="card" style={props.style}>
            {(props.headerLeft || props.headerRight) && (
                <div className="cardHeader">
                    {props.headerLeft && (
                        <div
                            style={{
                                alignSelf: 'center',
                                fontSize: '20px',
                                fontWeight: '500',
                            }}>
                            {props.headerLeft}
                        </div>
                    )}
                    {props.headerRight && props.headerRight}
                </div>
            )}

            {props.children}
        </div>
    );
};

export default Card;
