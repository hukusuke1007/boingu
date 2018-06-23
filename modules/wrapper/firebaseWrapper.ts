import firebase from 'firebase/app'
import User from '~/modules/model/firebase/firebaseUserModel'
import axios from 'axios'
import utility from '~/modules/utils/utility'

export class firebaseWrapper {

    REST_API: string = process.env.FIREBASE_FUNCTIONS_REST_API

    constructor() {
        console.log('constructor firebaseWrapper')
    }

    /*** ここから下は全てModelに集約　削除予定 ***/
    /*
    public async login (type: string): Promise<User> {
        let user:User = null
        try {
            let provider: any
            if (type === 'twitter') {
                provider = new firebase.auth.TwitterAuthProvider()
            }
            let auth = await firebase.auth().signInWithPopup(provider)
            
            // user = new User(auth.user.uid, new Date(), new Date(), 
                    auth.additionalUserInfo.username, auth.user.displayName,
                    auth.user.email, auth.additionalUserInfo.profile.description)
                  
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(user)
    }

    public getMyAccount() {
        let promise = new Promise<User>((resolve, reject) => {
            let user:User = null
            // 監視する.
            firebase.auth().onAuthStateChanged((auth) => {
                console.log('onAuthStateChanged', auth)
                if (auth != null) {
                    let frStore = firebase.firestore()
                    frStore.collection('user').doc(auth.uid).get()
                      .then((ref) => {
                        let refUser = ref.data()
                        // user = new User(refUser.uid, refUser.createDate, refUser.updateDate, 
                                        refUser.username, refUser.displayName,
                                        refUser.email, refUser.description)
                        resolve(user)
                      }).catch((error) => {
                        console.error(error)
                        reject(error)
                      })
                }
            })
        })
        return promise
    }
    public async createUser (user: User): Promise<User> {
        let userDoc = user
        let frStore = firebase.firestore()
        try {
            await frStore.collection('user').doc(user.uid).set(user.toJSON())
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(userDoc)
    }
    */
    
    // ViewModel的なとこでやるべきか.
    public async shareMyBestDay (message: string, file: any): Promise<any>{
        let util = new utility()
        let filenamePath = 'images/' + 'boingu' + '_' + util.getUniqueString() + "_" + util.getDateStringLabel(new Date) + ".png"
        let result: any
        try {
            result = await this.updateFile(filenamePath, file)
            result = await this.shareMediaToSNS(message, filenamePath)
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

    // storageModelに集約すべきか
    public async updateFile (filenamePath: string, file: any): Promise<any> {
        let result: any
        try {
            let storageRef = firebase.storage().ref()
            let mountainsRef = storageRef.child(filenamePath)
            result = await mountainsRef.put(file)
            console.log('updateFile', result)
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

   public async downloadFile (folderName: string, filename: string): Promise<any> {
        let result: any
        try {
            let path = folderName + '/' + filename
            let storage = firebase.storage()
            let pathRef = storage.ref()
            result = await pathRef.child(path).getDownloadURL()
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

    // これはwrapperで良い気がする.
    public async shareMediaToSNS (message: string, filename: string): Promise<any> {
        console.log('shareMediaToTwitter')
        let api = this.REST_API + '/api/tweetWithMedia'
        let request = {
            message: message,
            filename: filename
        }
        let options = {
            headers: {'Content-Type': 'application/json'}
        }
        
        let result: any
        try {
            console.log(request)
            result = await axios.post(api, request, options)
            console.log('shareMediaToSNS', result)
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
        /*
        axios.post(api, request, options)
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.error(error)
            })
        */
    }
    // これはwrapperで良い気がする.
    public shareToSNS () {
        console.log('shareToTwitter')
        /*
        let apiCall = firebase.functions().httpsCallable('test')
        apiCall({text: 'test'}).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.error(error)
        })
        */
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
}