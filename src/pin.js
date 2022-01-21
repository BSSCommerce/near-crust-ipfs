// import got from 'got';
require('isomorphic-fetch');
const ipfsPinningService = 'https://pin.crustcode.com/psa';

async function pin(authHeader, cid, fileName) {
    if (cid.length !== 46) {
        throw new Error('CID len err');
    }
    try {
        const request = await fetch(ipfsPinningService + "/pins", {
            method: "POST",
            headers: {
                authorization: 'Bearer ' + authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cid: cid, name: fileName})
        })
        const response = await request.json();
        return response;
    } catch (e) {
        console.log(e);
    }

}
module.exports = {
    pin
};