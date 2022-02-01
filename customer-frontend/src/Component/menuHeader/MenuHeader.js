/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../Redux/actions/category.action';
import './style.css';
function MenuHeader() {
    const state = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const renderCategories = categories => {
        let allCategories = [];
        if (categories) {
            // usinng for or useing this result will same

            categories.map((category, index) => {
                allCategories.push(
                    <li key={index}>
                        {category.parentId ? (
                            <Link
                                to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
                                state={{ cid: 'category._id' }}>
                                {category.name}
                            </Link>
                        ) : (
                            <span>{category.name}</span>
                        )}
                        {category.children.length > 0 ? (
                            <ul>{renderCategories(category.children)}</ul>
                        ) : null}
                    </li>,
                );
            });
            return allCategories;
        } else {
            return allCategories;
        }
    };

    return (
        <div className="menuHeader">
            <ul>{renderCategories(state.categories)}</ul>
        </div>
    );
}

export default MenuHeader;
