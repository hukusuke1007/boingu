import baseModel from './firebaseBaseModel'
import firebase from 'firebase/app'

export default class userModel extends baseModel {
    username: string = ''
    displayName:string = ''
    email: string = ''
    description: string = ''
    isDelete: boolean = false
    isLoad: boolean = false

    constructor(uid: string, createDate: Date, updateDate: Date) {
        super(uid, createDate, updateDate)
    }
    /*
    constructor(uid: string, createDate: Date, updateDate: Date, username:string, displayName: string, email: string, description:string) {
        super(uid, createDate, updateDate)
        this.username = username
        this.displayName = displayName
        this.email = email
        this.description = description
    }
    */
    observeUserAccount() {
        let promise = new Promise<any>((resolve, reject) => {
            let result = { status: 'OK' }
            firebase.auth().onAuthStateChanged((auth) => {
                console.log('onAuthStateChanged', auth)
                if (auth != null) {
                    this.isLoad = true
                    let frStore = firebase.firestore()
                    frStore.collection('user').doc(auth.uid).get()
                      .then((ref) => {
                        let refUser = ref.data()
                        this.setData(refUser.uid, refUser.createDate, refUser.updateDate, 
                                    refUser.username, refUser.displayName,
                                    refUser.email, refUser.description)
                        this.isLoad = false
                        resolve(result)
                    }).catch((error) => {
                        console.error(error)
                        this.isLoad = false
                        reject(error)
                    })
                }
            })
        })
        return promise
    }

    async login (type: string): Promise<any> {
        let result: any = { status: 'OK' }
        try {
            let provider: any
            if (type === 'twitter') {
                provider = new firebase.auth.TwitterAuthProvider()
            }
            let auth = await firebase.auth().signInWithPopup(provider)
            this.setData(auth.user.uid, new Date(), new Date(), 
                auth.additionalUserInfo.username, auth.user.displayName,
                auth.user.email, auth.additionalUserInfo.profile.description)
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

    async updateUserAccount (): Promise<any> {
        let result: any = { status: 'OK' }
        try {
            let frStore = firebase.firestore()
            await frStore.collection('user').doc(this.uid).set(this.toJSON())
        } catch (error) {
            return Promise.reject(error)
        }
        return Promise.resolve(result)
    }

    toJSON(): Object {
        return {
            uid: this.uid,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            description: this.description,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete
        }
    }

    private setData(uid: string, createDate: Date, updateDate: Date, username:string, displayName: string, email: string, description:string) {
        this.uid = uid
        this.createDate = createDate
        this.updateDate = updateDate
        this.username = username
        this.displayName = displayName
        this.email = email
        this.description = description
    }
}