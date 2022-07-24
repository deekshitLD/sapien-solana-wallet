// The 'axios' module gives a promised-based HTTP client.
const axios = require('axios');

// The 'fs' built-in module provides us access to the file system.
const fs = require('fs');
const storj = require("uplink-nodejs");
const libUplink = new storj.Uplink();
var satelliteURL = "change-me-to-desired-satellite-address";
var apiKey = "change-me-to-desired-api-key";
var encryptionPassphrase = "change-me-to-desired-encryption";
var config = new storj.Config();
var uploadOptions = new storj.UploadOptions();
// The 'form-data' built-in module helps us submit forms and file uploads
// to other web applications.
const FormData = require('form-data');

/**
  * Uploads a file from `filepath` and pins it to the Storj IPFS pinning service.
  * @param {string} username your username for the Storj IPFS pinning service
  * @param {string} password your password for the Storj IPFS pinning service
  * @param {string} filepath the path to the file
  */

    var access = await libUplink.requestAccessWithPassphrase(satelliteURL, apiKey, encryptionPassphrase).catch((err) => {
        console.error(err)
    });

    var project = await access.openProject().catch((err) => {
        console.error(err)
    });
        
      await project.uploadObject(bucketName, objectName, uploadOptions).then(async (upload) => {  
        upload.write(filedata)
      }).catch((err) => {
          console.error(err)
      });


    async function uploadMediaFile(mediafile){
      var bucketName = "sapien";
      var objectName = "change-me-to-desired-object-name-on-storj";

      await project.uploadObject(bucketName, objectName, uploadOptions).then(async (upload) => {  
        pinFileToIPFS(username, password, filepath);
      }).catch((err) => {
         console.error(err)
      });
  };


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
 async function main() {
    const args = process.argv.slice(2)
    if (args.length !== 3) {
        console.error(`usage: ${process.argv[0]} ${process.argv[1]} <username> <password> <filepath>`)
        process.exit(1)
    }

    const [username, password, filepath] = args
    const result = await pinFileToIPFS(username, password, filepath)
    console.log(result)
}

/**
 * Don't forget to actually call the main function!
 * We can't `await` things at the top level, so this adds
 * a .catch() to grab any errors and print them to the console.
 */
main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  })