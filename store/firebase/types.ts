import User from '~/modules/model/firebase/firebaseUserModel'

export interface FirebaseState {
    user?: User
    isLoad: boolean
    isError: boolean
}