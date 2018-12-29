/**
 * Created by tang.jing on 2018/4/13.
 */

/*=========================数字计算方法扩展================================*/

class MathUtils {
	constructor () {

	}
	getRealQtySum (num1, num2) {
		let baseNum, baseNum1, baseNum2;
		try {
			baseNum1 = String(num1).split(".")[1].length;
		} catch (e) {
			baseNum1 = 0;
		}
		try {
			baseNum2 = String(num2).split(".")[1].length;
		} catch (e) {
			baseNum2 = 0;
		}
		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
		return (num1 * baseNum + num2 * baseNum) / baseNum;
	};

	/**
	 * 比较两个日期的大小 是否相差一月
	 *   date1 第一个比较日期
	 *   date2 第二个比较日期
	 * @returns true Or false
	 * @constructor
	 */
	getCompareBTMonth (date1, date2) {
		debugger;
		let sDate = new Date(date1);
		let eDate = new Date(date2);
		if (eDate.getFullYear() - sDate.getFullYear() > 1) {//先比较年       
			return true;
		} else if (eDate.getMonth() - sDate.getMonth() > 1) {//再比较月   
			return true;
		} else if (eDate.getMonth() - sDate.getMonth() == 1) {
			if (eDate.getDate() - sDate.getDate() >= 1) {
				return true;
			}
		} else if (eDate.getFullYear() - sDate.getFullYear() == 1) {
			if (eDate.getMonth() + 12 - sDate.getMonth() > 1) {
				return true;
			}
			else if (eDate.getDate() - sDate.getDate() >= 1) {
				return true;
			}
		}
		return false;
	};

	/**
	 * 比较两个日期的大小 是否是同一个月
	 *   date1 第一个比较日期
	 *   date2 第二个比较日期
	 * @returns true Or false
	 * @constructor
	 */
	getCompareIsSomeMonth (date1, date2) {
		debugger;
		let sDate = new Date(date1);
		let eDate = new Date(date2);
		if (eDate.getFullYear() - sDate.getFullYear() >= 1) {//先比较年       
			return true;
		} else if (eDate.getMonth() - sDate.getMonth() >= 1) {//再比较月   
			return true;
		}
		return false;
	}
}

const mathUtil = new MathUtils();
export default mathUtil;
