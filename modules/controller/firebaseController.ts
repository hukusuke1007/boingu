import firebase from 'firebase/app'
import axios from 'axios'
import utility from '~/modules/utils/utility'
import StorageModel from '~/modules/model/firebase/storage/firebaseStorageModel'
import User from '~/modules/model/firebase/firebaseUserModel'
import BestDay from '~/modules/model/firebase/firebaseBestDayModel'
import Content from '~/modules/model/firebase/firebaseBestDayContentModel'
import Try from '~/modules/model/firebase/firebaseTryModel'
import BestDayContent from '~/modules/model/firebase/firebaseBestDayContentModel'

export class firebaseController {

    REST_API: string = process.env.FIREBASE_FUNCTIONS_REST_API
    user: User = undefined

    constructor (user: User) {
        this.user = user
    }

    async shareBestDay (message: string, contents: Array<BestDayContent>, file: any) {
        let util = new utility()
        let filenamePath = 'images/' + 'boingu' + '_' + util.getUniqueString() + "_" + util.getDateStringLabel(new Date) + ".png"
        try {
            // storage
            let storage = new StorageModel(filenamePath, file)
            let imageUrl = await storage.upload()
            let result = await this.shareMediaToSNS(message, filenamePath)

            // database
            let id = await this.user.saveBestDayReference()
            let bestDay = new BestDay(this.user.uid, new Date(), new Date(), id)
            bestDay.imageUrl = imageUrl
            bestDay.setContents(contents)
            bestDay.saveBestDay()
            return result
        } catch (error) {
            throw error
        }
    }

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

}