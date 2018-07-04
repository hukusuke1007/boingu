import baseModel from './firebaseBaseModel'
import BestDayContent from './firebaseBestDayContentModel'

export default class bestDayModel extends baseModel {
    isDelete: boolean = false
    isLoad: boolean = false
    imageUrl: string = ''
    contents :Array<any> = []

    constructor(uid: string, createDate: Date, updateDate: Date, id: string) {
        super(uid, createDate, updateDate)
        this.id = id
    }

    async saveBestDay () {
        try {
            let result = await this.frStore.collection('bestDay').doc(this.id).set(this.toJSON())
            return result
        } catch (error) {
            throw error
        }
    }

    async getBestDay () {
        try {
            let snapshot = await this.frStore.collection('bestDay').doc(this.id).get()
            this.setData(snapshot.data())
            return snapshot.data()
        } catch (error) {
            throw error
        }
    }

    setContents (datalist: Array<BestDayContent>) {
        this.contents = []
        datalist.forEach((obj) => {
            this.contents.push(obj.toJSON())
        })
    }

    toJSON (): Object {
        return {
            user: this.uid,
            createDate: this.createDate,
            updateDate: this.updateDate,
            isDelete: this.isDelete,
            imageUrl: this.imageUrl,
            contents: this.contents
        }
    }

    private setData (data: any) {
        console.log('getBestDay', data)
        this.uid = data.user
        this.createDate = data.createDate
        this.updateDate = data.updateDate
        this.isDelete = data.isDelete
        this.imageUrl = data.imageUrl
        this.contents = data.contents
    }
}