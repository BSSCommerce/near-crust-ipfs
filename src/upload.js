const { create } = require('ipfs-http-client');

const ipfsGateway = 'https://crustwebsites.net';

async function upload(authHeader, content) {

    const ipfs = create({
        url: ipfsGateway + '/api/v0',
        headers: {
            authorization: 'Basic ' + authHeader
        }
    });
    const { cid } = await ipfs.add(content);

    const fileStat = await ipfs.files.stat("/ipfs/" + cid.toString());

    return {
        cid: cid.toString(),
        size: fileStat.cumulativeSize,
        path: `${ipfsGateway}/ipfs/${cid.toString()}`
    };
}
module.exports = {
    upload
};