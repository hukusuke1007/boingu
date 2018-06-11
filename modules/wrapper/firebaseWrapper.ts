import firebase from 'firebase/app'

export class firebaseWrapper {
    constructor(){
        console.log('constructor firebaseWrapper')
    }

    public login (type: string): any {
        let promise = new Promise((resolve, reject) => {
            let provider: any
            if (type === 'twitter') {
                provider = new firebase.auth.TwitterAuthProvider()
            }
            firebase.auth().signInWithPopup(provider)
            .then((result) => {
                console.log('Auth', result)
                let token = result.credential.accessToken
                let secret = result.credential.secret
                let user = result.user
                resolve(result)
            }).catch((error) => {
                console.error('Auth', error)
                let errorCode = error.code
                let errorMessage = error.message
                let email = error.email
                let credential = error.credential
                reject(error)
            })
        })
        return promise
    }
}