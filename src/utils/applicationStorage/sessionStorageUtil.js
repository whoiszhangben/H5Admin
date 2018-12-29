class SessionStorageUtil {
  getItem (name) {
    if (name) {
      let sessionName = window.btoa(encodeURIComponent(JSON.stringify(name)));
      let sessionValue = sessionStorage.getItem(sessionName);
      if (sessionValue) {
        return JSON.parse(decodeURIComponent(window.atob(sessionValue)));
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  setItem (name, value) {
    if (name) {
      sessionStorage.setItem(window.btoa(encodeURIComponent(JSON.stringify(name))), window.btoa(encodeURIComponent(JSON.stringify(value))));
    }
  }
};

const sessionUtil = new SessionStorageUtil();
export default sessionUtil;
