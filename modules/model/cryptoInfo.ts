import { CryptoInfo } from '~/store/firebase/types'
import { cryptoType } from '~/modules/define/enum'

export class cryptoInfo implements CryptoInfo {
    uid: string = ''
    type: cryptoType = cryptoType.nem
    addr: string = ''
}