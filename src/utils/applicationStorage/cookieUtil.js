class CookieUtils {
  getCookie (name) {
    let arr;
	let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) return decodeURI(arr[2]);
    else return null;
  }

  setCookie (name, value, days, hour, minute) {
    if (typeof days === 'undefined') {
      days = 0;
    }
    if (typeof hour === 'undefined') {
      hour = 0;
    }
    if (typeof minute === 'undefined') {
      minute = 0;
    }
    let exp = new Date();
    let tm = (days * 24 * 60 * 60 * 1000) + (hour * 60 * 60 * 1000) + (minute * 60 * 1000);
    exp.setTime(exp.getTime() + tm);
    document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toGMTString();
  }

  setInHostCookie (name, value) {
    document.cookie = name + '=' + encodeURI(value) + ';expires= -1';
  }

  unsetCookie (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  }
};

const cookieUtil = new CookieUtils();
export default cookieUtil;
