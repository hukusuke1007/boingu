import baseModel from './firebaseBaseModel'

export default class userModel extends baseModel {
    username: string = ''
    displayName:string = ''
    email: string = ''
    description: string = ''
    isDelete: boolean = false
    isLoad: boolean = false

    constructor(uid: string, createDate: Date, updateDate: Date, username:string, displayName: string, email: string, description:string) {
        super(uid, createDate, updateDate)
        this.username = username
        this.displayName = displayName
        this.email = email
        this.description = description
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
}