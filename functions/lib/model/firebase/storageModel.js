"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Storage = require("@google-cloud/storage");
/*
const storage = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

*/
const bucketname = 'BUCKET_NAME';
class storageModel {
    constructor(filenamePath) {
        this.filenamePath = filenamePath;
    }
    downloadFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                let path = this.filenamePath;
                const storage = Storage();
                const bucket = storage.bucket(bucketname);
                const file = bucket.file(path);
                const tempLocalFilename = `/tmp/${path}`;
                result = yield file.download({ destination: tempLocalFilename });
                /*
                let storage = firebase.storage()
                let file = storage.bucket().file(path)
                result = await file.download
                */
                // let blobStream = file.createWriteStream({ metadata:{ contentType: 'mimetype' } })
                // result = await pathRef.child(path).getDownloadURL()
            }
            catch (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
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
        });
    }
}
exports.default = storageModel;
//# sourceMappingURL=storageModel.js.map