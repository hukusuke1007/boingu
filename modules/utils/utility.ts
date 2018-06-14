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

    public getDateString(date: Date): string {
        /*
        let months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ]
        */
        let months = [
            '1', '2', '3', '4', '5', '6', '7', '8',
            '9', '10', '11', '12'
        ]
        
        let days = [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
        ]
        /*
        let days = [
            '日', '月', '火', '水', '木', '金', '土'
        ]
        */
        let dayOfWeek = days[date.getDay()]
        let month = months[date.getMonth()]
        let day = date.getDate()
        let year = date.getFullYear()
        // let dateString = dayOfWeek + ', ' + month + ' ' + day + ', ' + year
        let dateString = year + '/' + month + '/' + day + ' (' + dayOfWeek + ') '
        return dateString
    }
}
