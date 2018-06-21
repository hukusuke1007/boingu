import * as Storage from '@google-cloud/storage'

const BUCKET_NAME = process.env.FIREBASE_STORAGE_BUCKET

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
            console.log('bucketname', BUCKET_NAME)
            console.log('path', path)
            const bucket = storage.bucket(BUCKET_NAME)
            const file = bucket.file(path)
            /*
            let option = { contentType: 'mimetype'}
            const tempLocalFilename = `/tmp/${path}`
            */
            result = await file.download()
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

    public async deleteFile (): Promise<any> {
        let result: any
        try {
            let path = this.filenamePath
            const storage = Storage()
            result = await storage.bucket(BUCKET_NAME).file(path).delete()
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

}