import baseModel from './firebaseBaseModel'
import timeData from './firebaseTimeDataModel'

export default class timeDataListModel extends baseModel {
    
    timeDataIdList: Array<string> = undefined
    isDelete: boolean = false
    isLoad: boolean = false

    constructor(uid: string, createDate: Date, updateDate: Date) {
        super(uid, createDate, updateDate)
    }

    toJSON(): Object {
        return {
            uid: this.uid,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete
        }
    }
}