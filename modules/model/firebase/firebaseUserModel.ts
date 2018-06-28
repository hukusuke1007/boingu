import baseModel from './firebaseBaseModel'
import firebase from 'firebase/app'

export default class userModel extends baseModel {
    username: string = ''
    displayName:string = ''
    email: string = ''
    description: string = ''
    iconUrl: string = ""
    isDelete: boolean = false
    isLoad: boolean = false
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
                    this.isLoad = true
                    this.frStore.collection('user').doc(auth.uid).get()
                      .then((ref) => {
                        let data = ref.data()
                        data.iconUrl = auth.providerData[0].photoURL
                        this.setData(data)
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
                description: auth.additionalUserInfo.profile.description,
                iconUrl: auth.additionalUserInfo.profile.photoURL
            }
            this.setData(data)
            return auth
        } catch (error) {
            throw error
        }
    }

    async setUser () {
        try {
            let result = await this.frStore.collection('user').doc(this.uid).set(this.toJSON())
            return result
        } catch (error) {
            throw error
        }
    }

    async setBestDayReference () {
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
            description: this.description,
            iconUrl: this.iconUrl,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete
        }
    }

    private setData(data: any) {
        this.uid = data.uid
        this.createDate = data.createDate
        this.updateDate = data.updateDate
        this.username = data.username
        this.displayName = data.displayName
        this.email = data.email
        this.description = data.description
        this.iconUrl = data.iconUrl
    }
}