import baseModel from './firebaseBaseModel'

export default class tryModel extends baseModel {
    content: string = ''
    color: string = ''
    isDelete: boolean = false
    isLoad: boolean = false

    constructor(uid: string, createDate: Date, updateDate: Date, content:string, color: string) {
        super(uid, createDate, updateDate)
        this.content = content
        this.color = color
    }

    toJSON(): Object {
        return {
            uid: this.uid,
            content: this.content,
            color: this.color,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete
        }
    }
}