// import baseModel from './firebaseBaseModel'

export default class bestDayContentModel  {
    resource: number = 1
    content: string = ''
    comment: string = ''
    color: string = ''
    isDelete:boolean = false
    isLoad: boolean = false

    constructor(resource:number, content:string, comment:string, color: string) {
        this.resource = resource
        this.content = content
        this.comment = comment
        this.color = color
    }

    toJSON(): Object {
        return {
            resource: this.resource,
            content: this.content,
            comment: this.comment,
            isDelete: this.isDelete
        }
    }
}