/**
 * Created by Muchinfo
 * 专用于日志打印的工具类
 */

class LogUtil {
    /**
     * 打印日志的内部方法
     *   logString 日志内容
     *   type      日志类型
     */
    writeLog (logString, type) {
        if (window.isPrintLog) {
            if (type === 'log') {
                // console.log(Moment().format('YYYY-MM-DD HH:mm:ss.SSS') + '   :   ' +
                //     ((typeof logString === 'object') ? logString.stack : logString));
            } else if (type === 'warn') {
                // console.warn(Moment().format('YYYY-MM-DD HH:mm:ss.SSS') + '   :   ' +
                //     ((typeof logString === 'object') ? logString.stack : logString));
            } else {
                // console.error(Moment().format('YYYY-MM-DD HH:mm:ss.SSS') + '   :   ' +
                //     ((typeof logString === 'object') ? logString.stack : logString));
            }
        }
    }

    /**
     * 打印消息类日志的方法
     *   logString 日志内容
     */
    printLog (logString) {
        if (window.isPrintLog) {
            this.writeLog(logString, 'log');
        }
    }

    /**
     * 打印警告类日志的方法
     *   warnString    日志内容
     */
    printWarn (warnString) {
        this.writeLog(warnString, 'warn');
    }

    /**
     * 打印错误类日志的方法
     *   errorString   日志内容
     */
    printError (errorString) {
        this.writeLog(errorString, 'error');
    }

	/**
	 * 打印提示类日志的方法
	 *   errorString   日志内容
	 */
    log (obj) {
        if (window.$write$log$) {
        }
    }
};

const logUtil = new LogUtil();
export default logUtil;
