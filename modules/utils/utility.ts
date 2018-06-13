import Try from '~/modules/model/firebase/firebaseTryModel'

export default class utility {
    constructor () {
    }

    public getTryDefaultList(): Array<Try> {
        let wakeup: Try = new Try('', new Date, new Date, '起床', 'blue')
        let eat: Try = new Try('', new Date, new Date, '食事', 'green')
        let hobby: Try = new Try('', new Date, new Date, '趣味', 'purple')
        let sleep: Try = new Try('', new Date, new Date, '就寝', 'orange')
        let list:Array<Try> = [wakeup, eat, hobby, sleep]
        return list
    }
}
