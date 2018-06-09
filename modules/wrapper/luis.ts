import axios from 'axios'

export class luisWrapper {
    private api:string = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/0623e68e-1895-4e7e-91fb-baaa6ac546e0?subscription-key=1316ccc2a86b4066adcd78f0900a7bd1&verbose=true&timezoneOffset=0&q='
    
    constructor(){
        console.log('constructor luisWrapper')
    }
    /*
    public getAnswer(msg: string): any {
        let url:string = this.api + "\"" + msg + "\""
        console.log('msg', msg, url)
        axios.get(url).then((data) => {
            console.log(data)
            return data
        }).catch((error) => {
            console.error('error', error)
            return null
        })
    }
    */
    public async getAnswer(msg: string): Promise<any> {
        let url:string = this.api + "\"" + msg + "\""
        console.log('url', url)
        let answer = await axios.get(url)
        let result = answer.data
        return this.convertAnswer(result)
    }

    /* メモ
    {intent: "TestDrive", score: 0.770958543}
    {intent: "None", score: 0.02762292}
    {intent: "WantEstimate", score: 0.0118683809}
    {intent: "UseMonitor", score: 0.0106509859}
    {intent: "CheckCarStatus", score: 0.00618524058}
    {intent: "PayKnow", score: 0.00550528429}
    */
    private convertAnswer(result: any): string {
        let answer = '理解できませんでした'
        console.log('result', result)
        if ('topScoringIntent' in result) {
            let info = result.topScoringIntent
            if ( info.score >= 0.1 ) {
                if (info.intent === 'TestDrive') {
                    answer = "試乗できる車は" + "\n" +
                        "・エスティマ" +　"\n" +
                        "・カローラ" +　"\n" +
                        "・タント" +　"\n" +
                        "です"
                } else if (info.intent === 'WantEstimate') {
                    answer = "お見積りは1億円です。"
                } else if (info.intent === 'UseMonitor') {
                    answer = "モニターのお問い合わせはこちらです。\n電話番号: XXXX-XXXX-XXXX"
                } else if (info.intent === 'CheckCarStatus') {
                    answer = "調子の良い車は エスティマ です"
                } else if (info.intent === 'PayKnow') {
                    answer = "お支払額は以下のとおりです。" + "\n" +
                        "・エスティマ: 400万円" +　"\n" +
                        "・カローラ: 380万円" +　"\n" +
                        "・タント: 100万円" +　"\n"
                } else if (info.intent === 'Redmine') {
                    answer = "社内ルールが書かれたURLを教えるね。" + "\n" + 
                        "http://redmine3.genio.co.jp/projects/geniocom/wiki" 
                } else {
                    answer = "理解できませんでした。"
                }
            } else {
                answer = "その質問は学習されていません。LUISを賢くしてください。"
            }
        }
        return answer
    }
}