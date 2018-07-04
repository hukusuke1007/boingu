import baseModel from './firebaseBaseModel'
import firebase from 'firebase/app'

export default class userModel extends baseModel {
    username: string = ''
    displayName:string = ''
    email: string = ''
    location: string = ''
    description: string = ''
    iconUrl: string = ''
    isDelete: boolean = false
    isLogin?: boolean = undefined
    bestDays: Array<string> = []  // ドキュメント参照配列

    constructor(uid: string, createDate: Date, updateDate: Date) {
        super(uid, createDate, updateDate)
    }

    observeUserAccount() {
        let promise = new Promise<any>((resolve, reject) => {
            let result = { status: 'OK' }
            firebase.auth().onAuthStateChanged((auth) => {
                console.log('onAuthStateChanged', auth)
                if (auth != null) {
                    this.isLogin = true
                    this.frStore.collection('user').doc(auth.uid).get()
                      .then((ref) => {
                        let data = ref.data()
                        this.setData(data)
                        resolve(result)
                    }).catch((error) => {
                        console.error(error)
                        reject(error)
                    })
                } else {
                    this.init()
                }
            })
        })
        return promise
    }

    async login (type: string) {
        try {
            let provider: any = new firebase.auth.TwitterAuthProvider()
            let auth = await firebase.auth().signInWithPopup(provider)
            console.log('login', auth)
            let data = {
                uid: auth.user.uid,
                createDate: new Date(),
                updateDate: new Date(),
                username: auth.additionalUserInfo.username,
                displayName: auth.user.displayName,
                email: auth.user.email,
                location: auth.additionalUserInfo.profile.location,
                description: auth.additionalUserInfo.profile.description,
                iconUrl: auth.additionalUserInfo.profile.profile_image_url_https
            }
            this.setData(data)
            return auth
        } catch (error) {
            throw error
        }
    }

    async logout () {
        try {
            let auth = await firebase.auth().signOut()
            console.log(auth)
            return auth
        } catch (error) {
            throw error
        }
    }

    async saveUser () {
        try {
            console.log('setUser', this.toJSON())
            let result = await this.frStore.collection('user').doc(this.uid).set(this.toJSON())
            return result
        } catch (error) {
            throw error
        }
    }

    async saveBestDayReference () {
        try {
            let collection = this.frStore.collection('user').doc(this.uid).collection('bestDay').doc()
            await collection.set({[collection.id]: true})
            this.bestDays.push(collection.id)
            return collection.id
        } catch (error) {
            throw error
        }
    }

    async getBestDayReference () {
        try {
            this.bestDays = []
            let snapshot = await this.frStore.collection('user').doc(this.uid).collection('bestDay').get()
            snapshot.docs.forEach((doc) => {
                this.bestDays.push(doc.id)
            })
            return this.bestDays
        } catch (error) {
            throw error
        }
    }

    toJSON(): Object {
        return {
            uid: this.uid,
            username: this.username,
            displayName: this.displayName,
            email: this.email,
            location: this.location,
            description: this.description,
            iconUrl: this.iconUrl,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete
        }
    }

    private init() {
        this.uid = ''
        this.createDate = null
        this.updateDate = null
        this.username = ''
        this.displayName = ''
        this.email = ''
        this.location = ''
        this.description = ''
        this.iconUrl = ''
        this.bestDays = []
        this.isLogin = false
    }

    private setData(data: any) {
        this.uid = data.uid
        this.createDate = data.createDate
        this.updateDate = data.updateDate
        this.username = data.username
        this.displayName = data.displayName
        this.email = data.email
        this.location = data.location
        this.description = data.description
        this.iconUrl = data.iconUrl
    }
}