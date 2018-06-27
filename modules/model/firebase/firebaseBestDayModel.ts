import baseModel from './firebaseBaseModel'
import contents from './firebaseBestDayContentModel'

export default class bestDayModel extends baseModel {
    isDelete: boolean = false
    isLoad: boolean = false
    contents :Array<contents> = []

    constructor(uid: string, createDate: Date, updateDate: Date, user:string) {
        super(uid, createDate, updateDate)
    }

    async create () {
        try {
            let result = await this.frStore.collection('bestDay').add(this.toJSON())
            return result
        } catch (error) {
            throw error
        }
    }

    async update () {
        try {
            let result = await this.frStore.collection('bestDay').doc(this.id).set(this.toJSON())
            return result
        } catch (error) {
            throw error
        }
    }

    toJSON(): Object {
        return {
            user: this.uid,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete
        }
    }
}