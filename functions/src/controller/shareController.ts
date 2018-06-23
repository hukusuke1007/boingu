import twitterModel from '../model/twitter/twitterModel'
import storageModel from '../model/firebase/storageModel'

export default class shareController {
    constructor () {
    }

    public async shareMediaToSNS (message: string, filenamePath: string): Promise<any> {
        let result: any
        try {
            let storage = new storageModel(filenamePath)
            let twitter = new twitterModel()
            let downloadFile = await storage.downloadFile()
            result = await twitter.tweetWithMedia(message, downloadFile)
            result = await storage.deleteFile()
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }
}