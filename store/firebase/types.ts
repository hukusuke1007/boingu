import User from '~/modules/model/firebase/firebaseUserModel'
import Wallet from '~/modules/model/firebase/firebaseWalletModel'
import Try from '~/modules/model/firebase/firebaseTryModel'

export interface FirebaseState {
    user?: User
    wallet?: Wallet
    tryList?: Array<Try>
    isLoad: boolean
    isError: boolean
}