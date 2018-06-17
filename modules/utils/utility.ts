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

    public isSmartPhone (): boolean {
        let media = [
          'iPhone',
          'iPad',
          'Android'
        ]
        let pattern = new RegExp(media.join('|'), 'i')
        return pattern.test(navigator.userAgent)
    }
      
    public getBrowser (): string {
        let userAgent = window.navigator.userAgent.toLowerCase()
        if (userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1) {
          return 'IE'
        } else if (userAgent.indexOf('edge') !== -1) {
          return 'edge'
        } else if (userAgent.indexOf('chrome') !== -1) {
          return 'chrome'
        } else if (userAgent.indexOf('safari') !== -1) {
          return 'safari'
        } else if (userAgent.indexOf('firefox') !== -1) {
          return 'firefox'
        } else if (userAgent.indexOf('opera') !== -1) {
          return 'opera'
        } else {
          return 'Unknow'
        }
    }

    public getUniqueString (): string {
        let strong = Math.pow(10, 18)
        return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    }
      
}
