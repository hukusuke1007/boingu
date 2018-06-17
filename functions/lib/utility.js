"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utility {
    setDefaultParameter(responce) {
        let res = responce;
        res.set('Access-Control-Allow-Origin', "*");
        // res.set('Access-Control-Allow-Methods', 'GET, POST')
        return res;
    }
}
exports.default = Utility;
//# sourceMappingURL=utility.js.map