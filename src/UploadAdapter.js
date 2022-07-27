// The 'axios' module gives a promised-based HTTP client.

import { uploadFile } from "./helper";
class UploadAdapter {
    constructor (loader) {
        this.loader = loader
    }

    upload() {
        return this.loader.file.then(file => {
            new Promise((resolve, reject) => {
                uploadFile(file, "image").then(url => {
                    resolve({default: url});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                })
            });
        })
    }
}

export default UploadAdapter;
