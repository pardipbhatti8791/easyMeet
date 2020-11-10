/**
 *
 * @param data
 * @param key
 * @returns {*}
 */
export const accessFromArray = (data, key) => {
    if(data && data !== null) {
        if(data.hasOwnProperty(key)) {
            var newObj = [...Object.values(data[key])]
            return newObj;
        } else {
            return 'Invalid key'
        }
    }
     
}