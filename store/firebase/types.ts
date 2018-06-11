import { cryptoType } from '~/modules/define/enum'

export interface User {
    uid: string
    id: string
    name: string
    email: string
    isDelete: boolean
    createDate: string
    updateDate: string
    cryptoInfo?: CryptoInfo
}

export interface CryptoInfo {
    uid: string
    type: cryptoType
    addr: string
}

export interface FirebaseState {
    user?: User
    isLoad: boolean
    isError: boolean
}