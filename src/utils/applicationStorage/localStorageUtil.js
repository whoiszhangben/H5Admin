class LocalStorageUtil {
    getItem (key) {
        if (key) {
            let localValue = localStorage.getItem(key);
            if (localValue) {
                let decodeString = decodeURIComponent(window.atob(localValue));
                if (decodeString && decodeString !== 'undefined') {
                    return JSON.parse(decodeString);
                } else {
                    return '';
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    setItem (key, value) {
        if (key) {
            localStorage.setItem(key, window.btoa(encodeURIComponent(JSON.stringify(value))));
        }
    }

    removeItem (key) {
        if (key) {
            localStorage.removeItem(key);
        }
    }
};

export default new LocalStorageUtil();
