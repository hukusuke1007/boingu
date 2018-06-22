export default abstract class baseModel {
    // ドキュメントオーナーのID
    // readonly uid: string
    uid: string
    // ドキュメント ID
    id: string | null
    // 作成日
    createDate: Date
    // 更新日
    updateDate: Date
    
    constructor(uid: string, createDate:Date, updateDate:Date) {
        this.uid = uid
        this.createDate = createDate
        this.updateDate = updateDate
    }

    // Firestoreに保存するとき使用
    abstract toJSON(): Object
}