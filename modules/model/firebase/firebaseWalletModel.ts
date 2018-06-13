import baseModel from './firebaseBaseModel'

export default class walletModel extends baseModel {
    type: string
    publicKey: string
    privateKey: string
    addr: string
    isLoad: boolean = false

    constructor(uid: string, createDate: Date, updateDate: Date, type: string, publicKey: string, privateKey: string, addr: string ) {
        super(uid, createDate, updateDate)
        this.type = type
        this.publicKey = publicKey
        this.privateKey = privateKey
        this.addr = addr
    }

    toJSON(): Object {
        return {
            uid: this.uid,
            type: this.type,
            publicKey: this.publicKey,
            privateKey: this.privateKey,
            addr: this.addr,
            createDate: this.createDate,
            updateDate: this.updateDate
        }
    }
}