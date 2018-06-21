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
const twitter = require("twitter");
const dotenv = require("dotenv");
dotenv.config();
class twitterModel {
    constructor() {
        this.twClient = new twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });
    }
    tweet(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                let params = { status: msg };
                console.log('twClient', process.env.TWITTER_CONSUMER_KEY);
                result = yield this.twClient.post('statuses/update', params);
                console.log(result);
                /*
                this.twClient.post('statuses/update', params, (error, tweet, response) => {
                  if (!error) {
                    console.log('tweet', tweet)
                  } else {
                    console.error('error', error)
                  }
                })
                */
            }
            catch (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
        });
    }
    tweetWithMedia(message, media) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                let mediaParams = { media: media };
                let resultMedia = yield this.twClient.post('media/upload', mediaParams);
                console.log('media', resultMedia);
                if ('media_id_string' in resultMedia) {
                    let status = {
                        status: message,
                        media_ids: resultMedia.media_id_string
                    };
                    result = yield this.twClient.post('statuses/update', status);
                }
                else {
                    console.log('media_id_string is notthing');
                }
            }
            catch (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
        });
    }
    getTimeline(screen_name) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                let params = { screen_name: screen_name };
                result = yield this.twClient.get('statuses/user_timeline', params);
                console.log(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(result);
        });
    }
}
exports.default = twitterModel;
//# sourceMappingURL=twitterModel.js.map