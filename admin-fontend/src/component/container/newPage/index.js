import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPage } from '../../../Store/actions/createPage.action';
import { createCategoryList } from '../../customHandler/customHandler';
import Layout from '../../layout';
import Input from '../../UI/Input';
import Model from '../../UI/Model';

function NewPage() {
    //satate
    const [createPageModal, setCreatePageModal] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [pageBanner, setPageBanner] = useState([]);
    const [pageProduct, setPageProduct] = useState([]);

    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const createPageModalClose = hide => {
        if (hide == true) {
            setCreatePageModal(false);
        } else {
            const form = new FormData();
            form.append('title', title);
            form.append('category', category);
            form.append('descrption', description);
            form.append('type', type);
            pageBanner.forEach(banner => {
                form.append('banners', banner);
            });
            pageProduct.forEach(product => {
                form.append('products', product);
            });

            dispatch(addPage(form));
            setCreatePageModal(false);
        }
    };

    const categoryChange = e => {
        const category = categories.categories.find(
            category => category._id == e.target.value,
        );
        setCategory(e.target.value), setType(category.type);
    };

    const createPageModalShow = () => {
        setCreatePageModal(true);
    };
    console.log(category);
    return (
        <Layout name="Page" sidebar>
            <Container>
                <Row>
                    <Col>
                        <Button onClick={createPageModalShow}>
                            create Page
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* create page modal  */}
            <Model
                show={createPageModal}
                handleClose={createPageModalClose}
                title="Add a new Page">
                <select
                    className="form-control"
                    value={category}
                    onChange={categoryChange}>
                    <option value="">Select a category</option>
                    {createCategoryList(categories.categories).map(option => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <Input
                    label="name"
                    type="text"
                    placeholder="Page Title"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                    }}
                />
                <Input
                    label="description"
                    type="text"
                    placeholder="page description"
                    value={description}
                    onChange={e => {
                        setDescription(e.target.value);
                    }}
                />
                {/* img upload for banner  */}
                <div style={{ display: 'flex', fleDirection: 'row' }}>
                    {pageBanner.length > 0
                        ? pageBanner.map((pic, index) => (
                              <div key={index}>
                                  <img
                                      style={{
                                          height: '80px',
                                          width: '100px',
                                          margin: '5px',
                                      }}
                                      src={URL.createObjectURL(pic)}
                                      alt=""
                                  />
                              </div>
                          ))
                        : null}
                </div>
                <Input
                    type="file"
                    name="Product Picture"
                    onChange={e =>
                        setPageBanner([...pageBanner, e.target.files[0]])
                    }
                />

                {/* image upload for product page  */}
                <div style={{ display: 'flex', fleDirection: 'row' }}>
                    {pageProduct.length > 0
                        ? pageProduct.map((pic, index) => (
                              <div key={index}>
                                  <img
                                      style={{
                                          height: '80px',
                                          width: '100px',
                                          margin: '5px',
                                      }}
                                      src={URL.createObjectURL(pic)}
                                      alt=""
                                  />
                              </div>
                          ))
                        : null}
                </div>
                <input
                    type="file"
                    name="Product Picture"
                    onChange={e =>
                        setPageProduct([...pageProduct, e.target.files[0]])
                    }
                />
            </Model>
        </Layout>
    );
}

export default NewPage;
