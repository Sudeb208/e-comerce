export const createCategoryList = (categories, options = []) => {
    console.log('createCategory');
    if (categories) {
        categories.map(category => {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        });
        return options;
    }
    return options;
};
