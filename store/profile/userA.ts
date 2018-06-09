// テスト用
import { User } from '~/store/profile/types'
export class userA implements User {
    firstName: string = 'hobby'
    lastName: string = 'develop'
    email: string = 'a@a.com'
    phone: string = '00000000000'
}