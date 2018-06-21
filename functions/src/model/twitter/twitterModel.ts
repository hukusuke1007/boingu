import * as twitter from 'twitter'
import * as dotenv from 'dotenv'
dotenv.config()

export default class twitterModel {
    twClient: any
    constructor () {
        this.twClient = new twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        })
    }

    public async tweet (msg: string): Promise<any> {
        let result: any
        try {
            let params = {status: msg}
            console.log('twClient', process.env.TWITTER_CONSUMER_KEY)
            result = await this.twClient.post('statuses/update', params)
            console.log(result)
            /*
            this.twClient.post('statuses/update', params, (error, tweet, response) => {
              if (!error) {
                console.log('tweet', tweet)
              } else {
                console.error('error', error)
              }
            })
            */
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

    public async tweetWithMedia (message: string, media: any): Promise<any> {
        let result: any
        try {
            let mediaParams = {media: media}
            let resultMedia = await this.twClient.post('media/upload', mediaParams)
            console.log('media', resultMedia)
            if ('media_id_string' in resultMedia ) {
                let status = {
                    status: message,
                    media_ids: resultMedia.media_id_string
                }
                result = await this.twClient.post('statuses/update', status)
            } else {
                console.log('media_id_string is notthing')
            }
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

    public async getTimeline (screen_name: string): Promise<any> {
        let result: any
        try {
            let params = {screen_name: screen_name}
            result = await this.twClient.get('statuses/user_timeline', params)
            console.log(result)
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }
}