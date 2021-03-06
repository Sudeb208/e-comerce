/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategory,
    deleteCategories,
    getAllCategory,
    updateCategories,
} from '../../../Store/actions/category.action';
import { createCategoryList } from '../../customHandler/customHandler';
import Layout from '../../layout';
import Model from '../../UI/Model';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowDropright,
    IoIosArrowDropdown,
    IoIosAddCircleOutline,
    IoMdAlbums,
    IoIosFolder,
    IoIosFolderOpen,
    IoIosFiling,
    IoIosCloudUpload,
} from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './CategoryStyle.css';
import Input from '../../UI/Input';

export default function Category() {
    const [show, setShow] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [parentId, setParentId] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [categoryImg, setCategoryImg] = useState('');
    const [checked, setChecked] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCateogryModal, setupdateCategoryModal] = useState(false);
    const [deleteCateogryModal, setDeleteCateogryModal] = useState(false);
    console.log('category');
    const dispatch = useDispatch();
    const state = useSelector(state => state.categories);

    // CLOSE Modal
    const handleClose = hide => {
        if (hide == true) {
            setShow(false);
        } else {
            if (newCategory === '') {
                window.alert('Category name required');
            }
            const form = new FormData();
            form.append('name', newCategory);
            form.append('parentId', parentId);
            form.append('type', categoryType);
            form.append('categoryImage', categoryImg);

            //dispatching
            dispatch(addCategory(form));
            setParentId('');
            setNewCategory('');
            if (state.error) {
                setShow(false);
                return <p>{state.error}</p>;
            } else {
                setShow(false);
            }
        }
    };
    console.log(categoryType);
    const updateCateogryClose = hide => {
        if (hide == true) {
            setupdateCategoryModal(false);
        } else {
            const form = new FormData();
            expandedArray.forEach((item, index) => {
                form.append('_id', item.value);
                form.append('name', item.name);
                form.append('type', item.type ? item.type : '');
                form.append('parentId', item.parentId ? item.parentId : '');
            });
            console.log(form.type);
            checkedArray.forEach((item, index) => {
                form.append('_id', item.value);
                form.append('name', item.name);
                form.append('type', item.type ? item.type : '');
                form.append('parentId', item.parentId ? item.parentId : '');
            });
            dispatch(updateCategories(form));
            setupdateCategoryModal(false);
        }
    };
    const deleteCateogryClose = hide => {
        if (hide == true) {
            setDeleteCateogryModal(false);
        } else {
            dispatch(deleteCategories({ checked }));
            setDeleteCateogryModal(false);
        }
    };

    const expandedAndCheckedCategory = () => {
        const checkedArray = [];
        const expandedArray = [];
        const categories = createCategoryList(state.categories);
        checked.length > 0 &&
            checked.forEach((categoryId, index) => {
                const category = categories.find(
                    (category, _index) => categoryId == category.value,
                );
                category && checkedArray.push(category);
            });
        expanded.length > 0 &&
            expanded.forEach((categoryId, index) => {
                const category = categories.find(
                    (category, _index) => categoryId == category.value,
                );
                category && expandedArray.push(category);
            });
        console.log({
            expanded,
            checked,
            categories,
            checkedArray,
            expandedArray,
        });
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    };

    // show modal
    const handleShow = () => setShow(true);
    const updateCateogryShow = () => {
        setupdateCategoryModal(true);
        expandedAndCheckedCategory();
    };

    const deleteCategoryShow = () => {
        setDeleteCateogryModal(true);
        expandedAndCheckedCategory();
    };

    // render categories form database arry
    const renderCategories = categories => {
        let allCategories = [];
        // allCategories.push(<li>phone</li>);
        // for (let category of categories) {
        //     allCategories.push(<li key={category.name}>{category.name}</li>);
        // }
        if (categories) {
            // usinng for or useing this result will same

            categories.map((category, index) => {
                allCategories.push({
                    label: category.name,
                    value: category._id,
                    type: category.type,
                    children:
                        category.children.length > 0 &&
                        renderCategories(category.children),
                });
            });
            // for (let category of categories) {
            //     allCategories.push(
            //         <li key={category.name}>{category.name}</li>,
            //     );
            // }
            return allCategories;
        } else {
            return allCategories;
        }
    };

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'expanded') {
            const updatedExpandedArry = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item,
            );
            setExpandedArray(updatedExpandedArry);
        } else if (type == 'checked') {
            const updatedCheckedArry = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item,
            );
            setCheckedArray(updatedCheckedArry);
        }
    };
    console.log(expandedArray);
    console.log(checkedArray);
    if (state.loading) {
        return <p>loading</p>;
    }

    return (
        <Layout name="Layout" sidebar>
            <Container className="category">
                <Row>
                    <Col md={12}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <h3>category</h3>
                            <div className="actionBtn">
                                <span>Action: </span>
                                <div className="btnGroup">
                                    <button onClick={handleShow}>
                                        <IoIosAddCircleOutline />
                                        <span>Add</span>
                                    </button>
                                    <button onClick={updateCateogryShow}>
                                        <IoIosCloudUpload />
                                        <span>Edit</span>
                                    </button>
                                    <button onClick={deleteCategoryShow}>
                                        <IoIosAddCircleOutline />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(state.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowDropright />,
                                expandOpen: <IoIosArrowDropdown />,
                                expandAll: (
                                    <span className="rct-icon rct-icon-expand-all" />
                                ),
                                collapseAll: (
                                    <span className="rct-icon rct-icon-collapse-all" />
                                ),
                                parentClose: <IoIosFolder />,
                                parentOpen: <IoIosFolderOpen />,
                                leaf: <IoIosFiling />,
                            }}
                        />
                    </Col>
                </Row>
            </Container>

            {/* model from react bootstarp */}
            {/* add category Modal  */}
            <Model
                title="Add new Category"
                handleClose={handleClose}
                show={show}
                buttonName="Create Category">
                <Row>
                    <Col>
                        <Input
                            type="text"
                            placeholder="Add a category"
                            value={newCategory}
                            onChange={e => {
                                setNewCategory(e.target.value);
                            }}
                        />
                    </Col>
                    <Col>
                        <select
                            className="form-control"
                            value={parentId}
                            onChange={e => setParentId(e.target.value)}>
                            <option value="">Select a category</option>
                            {createCategoryList(state.categories).map(
                                option => (
                                    <option
                                        key={option.value}
                                        value={option.value}>
                                        {option.name}
                                    </option>
                                ),
                            )}
                        </select>
                    </Col>
                    <Col>
                        <select
                            className="form-control"
                            value={categoryType}
                            onChange={e => setCategoryType(e.target.value)}>
                            <option>select Type </option>
                            <option value="store">Store </option>
                            <option value="product"> Product </option>
                            <option value="page"> Page </option>
                        </select>
                    </Col>
                </Row>

                <input
                    type="file"
                    name="category image"
                    onChange={e => setCategoryImg(e.target.files[0])}
                />
            </Model>
            {/* edit category */}
            <Model
                title="Update category"
                handleClose={updateCateogryClose}
                show={updateCateogryModal}
                size="lg">
                {/* expaned category  */}
                <Row>
                    <Col>
                        <h6> Expaned category</h6>
                    </Col>
                </Row>
                {expandedArray.length > 0 &&
                    expandedArray.map((item, index) => (
                        <Row key={index}>
                            <Col>
                                <Input
                                    type="text"
                                    placeholder="Edit a category"
                                    value={item.name}
                                    onChange={e =>
                                        handleCategoryInput(
                                            'name',
                                            e.target.value,
                                            index,
                                            'expanded',
                                        )
                                    }
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={e =>
                                        handleCategoryInput(
                                            'parentId',
                                            e.target.value,
                                            index,
                                            'expanded',
                                        )
                                    }>
                                    <option value="">Select a category</option>
                                    {createCategoryList(state.categories).map(
                                        option => (
                                            <option
                                                key={option.value}
                                                value={option.value}>
                                                {option.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.type}
                                    onChange={e =>
                                        handleCategoryInput(
                                            'type',
                                            e.target.value,
                                            index,
                                            'expanded',
                                        )
                                    }>
                                    <option>select Type </option>
                                    <option value="store">Store </option>
                                    <option value="product"> Product </option>
                                    <option value="page"> Page </option>
                                </select>
                            </Col>
                        </Row>
                    ))}

                {/* checked category  */}
                <Row>
                    <Col>
                        <h6>Checked Category</h6>
                    </Col>
                </Row>
                {checkedArray.length > 0 &&
                    checkedArray.map((item, index) => (
                        <Row key={index}>
                            <Col>
                                <Input
                                    type="text"
                                    placeholder="Edit a category"
                                    value={item.name}
                                    onChange={e =>
                                        handleCategoryInput(
                                            'name',
                                            e.target.value,
                                            index,
                                            'checked',
                                        )
                                    }
                                />
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.parentId}
                                    onChange={e =>
                                        handleCategoryInput(
                                            'parentId',
                                            e.target.value,
                                            index,
                                            'checked',
                                        )
                                    }>
                                    <option value= { undefined } >Select a category</option>
                                    {createCategoryList(state.categories).map(
                                        option => (
                                            <option
                                                key={option.value}
                                                value={option.value}>
                                                {option.name}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </Col>
                            <Col>
                                <select
                                    className="form-control"
                                    value={item.type}
                                    onChange={e =>
                                        handleCategoryInput(
                                            'type',
                                            e.target.value,
                                            index,
                                            'checked',
                                        )
                                    }>
                                    <option>select Type </option>
                                    <option value="store">Store </option>
                                    <option value="product"> Product </option>
                                    <option value="page"> Page </option>
                                </select>
                            </Col>
                        </Row>
                    ))}

                {/* <input
                    type="file"
                    name="category image"
                    onChange={e => setCategoryImg(e.target.files[0])}
                /> */}
            </Model>
            {/* delete category modal  */}
            <Model
                title="Delete category"
                handleClose={deleteCateogryClose}
                show={deleteCateogryModal}
                size="lg"
                button={[
                    {
                        label: 'No',
                        color: 'primary',
                        onclick: () => setDeleteCateogryModal(false),
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onclick: () => deleteCateogryClose(),
                    },
                ]}>
                <h6>deleteing Item</h6>
                {checkedArray.length > 0 &&
                    checkedArray.map((item, index) => (
                        <h6 key={index}>{item.name}</h6>
                    ))}
                are you sure??
            </Model>
        </Layout>
    );
}
