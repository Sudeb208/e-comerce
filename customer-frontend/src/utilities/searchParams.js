const searchParams = location => {
    const { search } = location;
    const searchArray = search.split('?');
    const keyValueArry = searchArray[1].split('&');
    const paramsObj = {};
    keyValueArry.forEach(Element => {
        const keyValue = Element.split('=');
        paramsObj[keyValue[0]] = keyValue[1];
    });
    return paramsObj;
};

export default searchParams;
