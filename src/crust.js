const { KeyPair } = require('near-api-js');
const { u8aToHex } = require('@polkadot/util');
const { upload } = require('./upload');
const { pin } =  require('./pin');
async function uploadToCrust(file) {

    // 1. get authheader

    const keyPair = KeyPair.fromRandom('ed25519');

    // get address
    const addressRaw = keyPair.getPublicKey().toString();
    const address = addressRaw.substring(8);

    // get singature
    const {signature} = keyPair.sign(Buffer.from(address));
    const sig = u8aToHex(signature).substring(2);

    // Authorization: Bear <base64(ChainType-PubKey:SignedMsg)>
    // compile a authHeader

    const authHeaderRaw = `near-${address}:${sig}`;
    const authHeader = Buffer.from(authHeaderRaw).toString('base64');

    // 2. post files onto IPFS/Cru
    let buffer =  Buffer.from(await file.arrayBuffer());
    const { cid, size, path } = await upload(authHeader, buffer);
    await pin(authHeader, cid, file.name);
    return { cid, path, size };
}

module.exports = {
    uploadToCrust
};