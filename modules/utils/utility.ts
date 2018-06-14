import Try from '~/modules/model/firebase/firebaseTryModel'

export default class utility {
    constructor () {
    }

    public getTryDefaultList(): Array<Try> {
        let sleep: Try = new Try('', new Date, new Date, '睡眠', 'blue')
        let eat: Try = new Try('', new Date, new Date, '食事', 'orange')
        let work: Try = new Try('', new Date, new Date, '仕事', 'green')
        let hobby: Try = new Try('', new Date, new Date, '趣味', 'purple')
        let list:Array<Try> = [sleep, eat, work, hobby]
        return list
    }
}
