import firebase from 'firebase/app'
import User from '~/modules/model/firebase/firebaseUserModel'

export class firebaseWrapper {

    constructor() {
        console.log('constructor firebaseWrapper')
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
                        user = new User(refUser.uid, refUser.createDate, refUser.updateDate, 
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

    public async login (type: string): Promise<User> {
        let user:User = null
        try {
            let provider: any
            if (type === 'twitter') {
                provider = new firebase.auth.TwitterAuthProvider()
            }
            let auth = await firebase.auth().signInWithPopup(provider)
            user = new User(auth.user.uid, new Date(), new Date(), 
                    auth.additionalUserInfo.username, auth.user.displayName,
                    auth.user.email, auth.additionalUserInfo.profile.description)          
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(user)
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
    /*
    public async test (user: User): Promise<User> {
        let userDoc = user
        let frStore = firebase.firestore()
        try {
            const ref = await frStore.collection('user/${ref.uid}').add(user.toJSON())
            userDoc.id = ref.id
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(userDoc)
    }
    */
}