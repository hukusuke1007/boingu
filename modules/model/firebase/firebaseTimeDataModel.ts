import baseModel from './firebaseBaseModel'

export default class timeDataModel extends baseModel  {
    time: number = 1
    content: string = ''
    comment: string = ''
    color: string = ''
    isDelete:boolean = false
    isLoad: boolean = false

    constructor(uid: string, createDate: Date, updateDate: Date, time:number, content:string, comment:string, color: string) {
        super(uid, createDate, updateDate)
        this.time = time
        this.content = content
        this.comment = comment
        this.color = color
    }

    toJSON(): Object {
        return {
            uid: this.uid,
            time: this.time,
            content: this.content,
            comment: this.comment,
            color: this.color,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete
        }
    }
}