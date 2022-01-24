/* eslint-disable no-case-declarations */
import { categoryConstants } from '../constants';

const initState = {
    categories: [],
    loading: false,
    error: '',
    message: '',
    newCategory: '',
};

const buildNewCategory = (parentId, categories, category) => {
    let myCategories = [];
    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: [],
            },
        ];
    }
    for (let cat of categories) {
        if (cat._id == parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                children: [],
            };
            myCategories.push({
                ...cat,
                children:
                    cat.children && cat.children.length > 0
                        ? buildNewCategory(parentId, [
                              ...cat.children,
                              newCategory,
                          ])
                        : [newCategory],
            });
        } else {
            myCategories.push({
                ...cat,
                children:
                    cat.children && cat.children.length > 0
                        ? buildNewCategory(parentId, cat.children, category)
                        : [],
            });
        }
    }
    return myCategories;
};

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case categoryConstants.POST_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.POST_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategory(
                category.parentId,
                state.categories,
                category,
            );

            state = {
                ...state,
                loading: false,
                categories: updatedCategories,
                newCategory: action.payload.category,
            };
            break;
        case categoryConstants.POST_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error:
                    action.payload.error == undefined
                        ? "can't create a category"
                        : action.payload.error,
            };
            break;
        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.data.message,
            };
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
            };
            break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                loading: false,
                message: action.payload.data,
            };
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                loading: false,
                message: action.payload.message,
            };
    }
    return state;
};
export default categoryReducer;
