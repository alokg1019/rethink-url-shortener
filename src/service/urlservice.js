
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;

const SERVER_URL = SERVER_HOST + ":" + SERVER_PORT;

/**
 *  Creates Short URL using the server API
 * 
 * @param {*} payload Long URL and domain
 * @param {*} callbackFunc Callback function to set state variables on success
 * @param {*} setAlertMessage Message function to set alert message data
 */
export const createShortUrl = (payload, callbackFunc, setAlertMessage) => {
    
    fetch(SERVER_URL + '/urls/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {

        //setting state data
        callbackFunc(data.short_url);

        setAlertMessage('success', 'Shortened URL: ' + data.short_url, true, "url_shortener");

    })
    .catch((error) => {
        setAlertMessage('error', 'Error: ' + error, true, "url_shortener");
    });
}

/**
 *  Find Long URL from a Short URL
 * 
 * @param {*} shortUrl Short URL to search
 * @param {*} callbackFunc Callback function to set state variables on success
 * @param {*} setAlertMessage Message function to set alert message data
 */
export const findLongUrlFromShortUrl = (shortUrl, callbackFunc, setAlertMessage) => {

    fetch(SERVER_URL + '/urls/get?url=' + shortUrl , {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {

        //setting state data
        callbackFunc(data.url);

        setAlertMessage('success', 'Long URL: ' + data.url.long_url, true, "url_finder");
    })
    .catch((error) => {
        setAlertMessage('error', 'Error: ' + error, true, "url_finder");
    });
}