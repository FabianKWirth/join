const STORAGE_TOKEN = '4QJ34MWA1MFP5EYJA33ASIAAU5L1A0CMTFMYVZI5';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Sets an item in the storage using a key-value pair.
 *
 * @async
 * @param {string} key - The key for the item.
 * @param {JSON} value - The value of the item.
 * @returns {Promise<{status: string, message: string}>} - The status and message of the operation.
 * @throws {Error} - If there's an error during the fetch operation or JSON parsing.
 */
async function setItem(key, value) {
    /**
     * Create a payload object.
     * @type {{key: string, value: JSON, token: string}} payload
     */
    const payload = { key, value, token: STORAGE_TOKEN };

    try {
        // Perform a fetch request to the storage URL.
        const response = await fetch(STORAGE_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
        })

        // Parse the response as JSON.
        const res = await response.json();
        return res;
       
    } catch (error) {
        throw new Error(`Error setting item: ${error.message}`);
    }
}

/**
 * Retrieves an item from the storage using a key.
 *
 * @async
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<{data: JSON}>} - The status and retrieved data of the operation.
 * @throws {Error} - If there's an error during the fetch operation or JSON parsing.
 */
async function getItem(key) {
    /**
     * Construct the URL for fetching the item.
     * @type {string} url
     */
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;

    try {
        // Perform a fetch request to retrieve the item. And parses the response as JSON
        const response = await fetch(url).then(res => res.json());

        if(response['status']=="success"){
            return (response['data']['value']);
        }else{
            return null;
        }
    } catch (error) {
        throw new Error(`Error getting item: ${error.message}`);
    }
}

async function loadUsers(){
    users=await getItem('users');
}