/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData } from '../../../Store/actions/initialData.action';
import { addProduct } from '../../../Store/actions/product.action';
import { genaratePublicUrl } from '../../../UrlConfig';
import { createCategoryList } from '../../customHandler/customHandler';
import Layout from '../../layout';
import Ui from '../../UI';
import Model from '../../UI/Model';

export default function Product() {
    const [show, setShow] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [productDatails, setProductDetails] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [productPicture, setProductPicture] = useState([]);
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories);
    const product = useSelector(state => state.products);

    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', category);
        for (let pic of productPicture) {
            form.append('productPicture', pic);
        }
        setShow(false);
        dispatch(addProduct(form));
    };
    const handleShow = () => {
        setShow(true);
    };
    const showProductclose = () => {
        setShowProduct(false);
    };
    const showProductDetails = product => {
        setProductDetails(product);
        setShowProduct(true);
        console.log(product);
    };

    return (
        <Layout name="Product" sidebar={true}>
            <Container>
                <Row>
                    <Col md={12}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <h3>Product</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.products.length > 0
                                    ? product.products.map((product, index) => (
                                          <tr key={product._id}>
                                              <td>{index + 1}.</td>
                                              <td
                                                  onClick={() =>
                                                      showProductDetails(
                                                          product,
                                                      )
                                                  }>
                                                  {product.name}
                                              </td>
                                              <td>{product.price}</td>
                                              <td>{product.quantity}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Model
                show={show}
                handleClose={handleClose}
                title="Add a new product">
                <Ui
                    label="name"
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <Ui
                    label="quantity"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={e => {
                        setQuantity(e.target.value);
                    }}
                />
                <Ui
                    label="Price"
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={e => {
                        setPrice(e.target.value);
                    }}
                />
                <Ui
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={e => {
                        setDescription(e.target.value);
                    }}
                />
                <select
                    className="form-control"
                    value={category}
                    onChange={e => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {createCategoryList(categories.categories).map(option => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {productPicture.length > 0
                    ? productPicture.map((pic, index) => (
                          <div key={index}>{pic.name}</div>
                      ))
                    : null}
                <input
                    type="file"
                    name="Product Picture"
                    onChange={e =>
                        setProductPicture([
                            ...productPicture,
                            e.target.files[0],
                        ])
                    }
                />
            </Model>
            <Model
                show={showProduct}
                handleClose={showProductclose}
                title="Products Details"
                size="lg">
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <div>
                            <p className="value">{productDatails.name}</p>
                        </div>
                    </Col>
                    <Col md="6">
                        <h5 className="key">Price</h5>
                        <div>
                            <p className="value">{productDatails.price}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className="key">Description</h5>
                        <div>
                            <p className="value">
                                {productDatails.description}
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Picture </label>
                        <div style={{display: 'flex'}}>
                                {productDatails.productPicture
                                    ? productDatails.productPicture.map(
                                          (picture, index) => (
                                              <div key={index} style={{with:'100px', height: '100px', textAlign: 'center'}}>
                                                  <img
                                                      src={genaratePublicUrl(
                                                          picture.img,
                                                      )}
                                                      style={{with:'100%', height: '100%', margin: '5px'}}
                                                  />
                                              </div>
                                          ),
                                      )
                                    : null}
                        </div>
                    </Col>
                </Row>
            </Model>
        </Layout>
    );
}
