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
const BUCKET_NAME = process.env.FIREBASE_STORAGE_BUCKET;
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
                console.log('bucketname', BUCKET_NAME);
                console.log('path', path);
                const bucket = storage.bucket(BUCKET_NAME);
                const file = bucket.file(path);
                /*
                let option = { contentType: 'mimetype'}
                const tempLocalFilename = `/tmp/${path}`
                */
                result = yield file.download();
            }
            catch (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
        });
    }
    deleteFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                let path = this.filenamePath;
                const storage = Storage();
                result = yield storage.bucket(BUCKET_NAME).file(path).delete();
            }
            catch (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
        });
    }
}
exports.default = storageModel;
//# sourceMappingURL=storageModel.js.map