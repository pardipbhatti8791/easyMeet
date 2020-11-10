/**
 *
 * @param data
 * @param key
 * @returns {*}
 */
export const accessFromObject = (data, key) => {
    if(data && data !== null) {
        if(data.hasOwnProperty(key)) {
            return data[key]
        } else {
            return 'Invalid key'
        }
    }
}