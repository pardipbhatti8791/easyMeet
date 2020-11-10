export const queryString = async query => {
    var obj = {};
    if (query === '') return obj;
    query = query.slice(1);
    query = query.split('&');
    const promises = query.map(function (part) {
        var key;
        var value;
        part = part.split('=');
        key = part[0];
        value = part[1];
        if (!obj[key]) {
            obj[key] = value;
        } else {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        }
        return true;
    });

    await Promise.all(promises);

    return obj;
};
