/**
 * Created by Muchinfo on 2017/8/04.
 * 工具函数
 */
class StringUtils {
    // region 工具函数相关

    /**
     * 生成uuid
     * @returns {string}
     */
    getUUID () {
        let len = 32; // 32长度
        let radix = 16; // 16进制
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [];
        radix = radix || chars.length;
        if (len) {
            for (let i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            let r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (let i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    };

    /**
     * 主要提供下单的MessageHead里使用
     * @return {string}
     */
    getHeadUUID () {
        let uuid = this.getUUID();
        return uuid.replace('-', '').substring(0, 16);
    };
    /**
     * 获取当前url的参数值,主要用于三方登录时获取参数
     * @return {string}
     */
    getUrlParam(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    };
    /**
     * 将服务传回的base64字符串转化为byte数组
     * @return {string}
     */
    base64DecodeToBytes(input){
        let _keyStr ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        input = this.removePaddingChars(input,_keyStr);
        input = this.removePaddingChars(input,_keyStr);

        let bytes = parseInt((input.length / 4) * 3, 10);

        let uarray;
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        let j = 0;

        uarray = new Uint8Array(bytes);
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        for (i=0; i<bytes; i+=3) {
            //get the 3 octects in 4 ascii chars
            enc1 = _keyStr.indexOf(input.charAt(j++));
            enc2 = _keyStr.indexOf(input.charAt(j++));
            enc3 = _keyStr.indexOf(input.charAt(j++));
            enc4 = _keyStr.indexOf(input.charAt(j++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            uarray[i] = chr1;
            if (enc3 != 64) uarray[i+1] = chr2;
            if (enc4 != 64) uarray[i+2] = chr3;
        }
        return uarray;
    };

    removePaddingChars(input,_keyStr){
        let lkey = _keyStr.indexOf(input.charAt(input.length - 1));
        if(lkey == 64){
            return input.substring(0,input.length - 1);
        }
        return input;
    }
}

const stringUtil = new StringUtils();
export default stringUtil;
