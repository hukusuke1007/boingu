import baseModel from './firebaseBaseModel'

export default class bestDayContentModel extends baseModel  {
    resource: number = 1
    content: string = ''
    comment: string = ''
    color: string = ''
    isDelete:boolean = false
    isLoad: boolean = false

    constructor(uid: string, createDate: Date, updateDate: Date, resource:number, content:string, comment:string, color: string) {
        super(uid, createDate, updateDate)
        this.resource = resource
        this.content = content
        this.comment = comment
        this.color = color
    }

    toJSON(): Object {
        return {
            user: this.uid,
            resource: this.resource,
            content: this.content,
            comment: this.comment,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete
        }
    }
}