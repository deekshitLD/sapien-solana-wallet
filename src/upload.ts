// The 'axios' module gives a promised-based HTTP client.
const axios = require('axios');

// The 'fs' built-in module provides us access to the file system.
const fs = require('fs');

// The 'form-data' built-in module helps us submit forms and file uploads
// to other web applications.
const FormData = require('form-data');

export function uploadMediaFile(filepath){
pinFileToIPFS($process.argv[0], $process.argv[1], filepath);
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

/**
 * The main entry point for the script that checks the command line arguments and
 * calls pinFileToIPFS.
 * 
 * To simplify the example, we don't do any fancy command line parsing. Just three
 * positional arguments for imagePath, name, and description
 */


/**
 * Don't forget to actually call the main function!
 * We can't `await` things at the top level, so this adds
 * a .catch() to grab any errors and print them to the console.
 */
