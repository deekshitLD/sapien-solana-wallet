const axios = require('axios');

// The 'fs' built-in module provides us access to the file system.
const fs = require('fs');

// The 'form-data' built-in module helps us submit forms and file uploads
// to other web applications.
const FormData = require('form-data');


var S3FS = require('s3fs');
var s3fsImpl = new S3FS('sapien/image/uploads',{
  accessKeyId:process.argv[2],
  secretAccessKey:process.argv[3]
});


export function uploadFile(file, filename) {
    return new Promise((resolve, reject) => {
    s3fsImpl.writeFile(file, stream, {"ContentType":"file"}).then(data=>{
        console.log(data);
    }).catch(error => {
        reject(error);
    })
});
    var filepath = 'sapien/image/uploads'&&"randomhere";
    pinFileToIPFS(process.argv[0], process.argv[1], filepath);
}


async function pinFileToIPFS(username, password, filepath) {
    // The HTTP upload endpoint of the Storj IPFS pinning service
    const url = `https://www.storj-ipfs.com/api/v0/add`;

    // Create a form with the file to upload
    let data = new FormData();
    data.append('file', fs.createReadStream(filepath));

    // Execute the Upload request to the Storj IPFS pinning service
    return axios.post(url,
        data,
        {
            auth: {
                username: username,
                password: password
            },
            headers: {
                'Content-Type': `multipart/form-data; boundary= ${data._boundary}`,
            },
            // These arguments remove any client-side upload size restrictions
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        },
    ).then(function (response) {
        console.log(response)
    }).catch(function (error) {
        console.error(error)
    });
};


    