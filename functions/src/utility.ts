import * as functions from 'firebase-functions';

export default class Utility {
    public setDefaultParameter (responce: functions.Response): functions.Response {
        let res = responce
        res.set('Access-Control-Allow-Origin', "*")
        // res.set('Access-Control-Allow-Methods', 'GET, POST')
        return res
    }
}