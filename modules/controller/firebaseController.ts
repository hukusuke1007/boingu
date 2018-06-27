import firebase from 'firebase/app'
import axios from 'axios'
import utility from '~/modules/utils/utility'
import storageModel from '~/modules/model/firebase/storage/firebaseStorageModel'

export class firebaseController {

    REST_API: string = process.env.FIREBASE_FUNCTIONS_REST_API

    constructor() {
        console.log('constructor firebaseWrapper')
    }

    // ViewModel的なとこでやるべきか.
    async shareMyBestDay (message: string, file: any) {
        let util = new utility()
        let filenamePath = 'images/' + 'boingu' + '_' + util.getUniqueString() + "_" + util.getDateStringLabel(new Date) + ".png"
        try {
            let storage = new storageModel(filenamePath, file)
            let stResult = await storage.upload()
            let result = await this.shareMediaToSNS(message, filenamePath)
            return result
        } catch (error) {
            throw error
        }
    }

    // これはwrapperで良い気がする.
    async shareMediaToSNS (message: string, filename: string) {
        console.log('shareMediaToTwitter')
        let api = this.REST_API + '/api/tweetWithMedia'
        let request = {
            message: message,
            filename: filename
        }
        let options = {
            headers: {'Content-Type': 'application/json'}
        }
        
        try {
            console.log(request)
            let result = await axios.post(api, request, options)
            console.log('shareMediaToSNS', result)
        } catch (error) {
            throw error
        }
    }

    /*
    public shareToSNS () {
        console.log('shareToTwitter')
        let apiCall = firebase.functions().httpsCallable('test')
        apiCall({text: 'test'}).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.error(error)
        })
        let api = this.REST_API + '/helloWorld'
        let request = {
            id: '1',
            name: 'aaa'
        }
        let options = {
            headers: {'Content-Type': 'application/json'}
        }
        axios.post(api, request, options)
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.error(error)
            })
   }
   */
}