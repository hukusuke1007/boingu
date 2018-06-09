import { User, CryptoInfo } from '~/store/firebase/types'
export class myUser implements User {
    uid: string = ''
    name: string = 'guest'
    email: string = ''
    isDelete: boolean = false
    createDate: string = ''
    updateDate: string = ''
    cryptoInfo: CryptoInfo = undefined
}