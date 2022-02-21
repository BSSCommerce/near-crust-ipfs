## Near Crust IPFS Implementation
A node JS package to upload file using Crust dStorage Solution (IPFS, pinning service) for NFT marketplace on NEAR.

## Install Package
`npm i near-crust-ipfs`

## Functions
- `upload(authHeader, content)`: to upload a file using Crust IPFS gateway
- `pin(authHeader, cid, fileName)`: to pin a file using Crust IPFS pinning service
- `uploadToCrust(file)`:  to upload & pin a file using Crust IPFS.

For NEAR, authHeader can be created by this code block:
```
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
```
##How to use

###Using React Dropzone Component
- [React Dropzone](https://react-dropzone.js.org/)
- [Sample Code](https://github.com/BSSCommerce/picasarts.io---Near/blob/master/src/components/common/ImageUpload.jsx)

###Using html file upload
Import library to your js file.
- `import { uploadToCrust } from "near-crust-ipfs"`

Create a html file upload

- `<input type="file" onChange={(e) => handleInputChange("file", e.target.files[0])} />`

Create a function handleInputChange to handle state, and use uploadToCrustFunction to upload
- `await uploadToCrust(file)`