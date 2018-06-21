import * as functions from 'firebase-functions'
import * as Storage from '@google-cloud/storage'
/*
const storage = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

*/
const bucketname = 'BUCKET_NAME'
export default class storageModel {
    filenamePath: string

    constructor (filenamePath: string) {
        this.filenamePath = filenamePath
    }

    public async downloadFile (): Promise<any> {
        let result: any
        try {
            let path = this.filenamePath
            const storage = Storage()
            const bucket = storage.bucket(bucketname)
            const file = bucket.file(path)
            const tempLocalFilename = `/tmp/${path}`
            result = await file.download({destination: tempLocalFilename})
            /*
            let storage = firebase.storage()
            let file = storage.bucket().file(path)
            result = await file.download
            */
            // let blobStream = file.createWriteStream({ metadata:{ contentType: 'mimetype' } })
            // result = await pathRef.child(path).getDownloadURL()
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
       /*
       let filenamePath = this.filenamePath
       const file = storage.bucket(bucketname).file(filenamePath);
       const tempLocalFilename = `/tmp/${filenamePath}`;

       file.download({destination: tempLocalFilename})
        .then(() => {
         console.log('Image downloaded locally to', tempLocalFilename);
         // Generate a thumbnail using ImageMagick.
         return spawn('convert', [tempLocalFilename, '-thumbnail', '200x200>', tempLocalFilename]);
        }).then(() => {
         console.log('Thumbnail created at', tempLocalFilename);
         // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
         const thumbFileName = `thumb_${fileName}`;
         const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
         // Uploading the thumbnail.
         return bucket.upload(tempFilePath, {
           destination: thumbFilePath,
           metadata: metadata,
         });
         // Once the thumbnail has been uploaded delete the local file to free up disk space.
       }).then(() => fs.unlinkSync(tempFilePath));
       */
    }

}