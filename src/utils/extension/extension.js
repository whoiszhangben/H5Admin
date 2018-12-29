/*=========================String方法扩展================================*/
/**
 * 字符串去除前后空格
 * @returns {string}
 */
String.prototype.trim = String.prototype.trim || function () {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 字符串去除前空格
 * @returns {string}
 */
String.prototype.trimLeft = String.prototype.trimLeft || function () {
	return this.replace(/^\s*/g, "");
};

/**
 * 字符串去除后空格
 * @returns {string}
 */
String.prototype.trimRight = String.prototype.trimRight || function () {
	return this.replace(/\s*$/g, "");
};

/**
 * 字符串左边补位
 *   totalWidth 补位后字符串长度
 *   paddingChar 补位字符
 * @constructor
 */
String.prototype.padLeft = String.prototype.padLeft || function (totalWidth, paddingChar) {
	if (paddingChar != null) {
		return this.padHelper(totalWidth, paddingChar, false);
	}
	else {
		return this.padHelper(totalWidth, ' ', false);
	}
};

/**
 * 字符串右边补位
 *   totalWidth 补位后字符串长度
 *   paddingChar 补位字符
 * @constructor
 */
String.prototype.padRight = String.prototype.padRight || function (totalWidth, paddingChar) {
	if (paddingChar != null) {
		return this.padHelper(totalWidth, paddingChar, true);
	}
	else {
		return this.padHelper(totalWidth, ' ', true);
	}
};

//补位辅助方法
String.prototype.padHelper = String.prototype.padHelper || function (totalWidth, paddingChar, isRightPadded) {
	if (this.length < totalWidth) {
		var paddingString = new String();
		for (i = 1; i <= (totalWidth - this.length); i++) {
			paddingString += paddingChar;
		}

		if (isRightPadded) {
			return (this + paddingString);
		}
		else {
			return (paddingString + this);
		}
	}
	else {
		return this;
	}
};

/**
 * 格式化字符串
 * @returns {string}
 */
String.prototype.format = String.prototype.format || function () {
	var result = this.toString();
	var reg;
	if (arguments.length > 1) {
		if (arguments.length === 2 && typeof (arguments[1]) == 'object') {
			for (var key in arguments[1]) {
				if (arguments[1][key] !== undefined) {
					reg = new RegExp('({' + key + '})', 'g');
					result = result.replace(reg, arguments[1][key]);
				}
			}
		}
		else {
			for (var i = 0; i < arguments.length; i++) {
				if (!!arguments[i]) {
					reg = new RegExp('({[' + i + ']})', 'g');
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
};

String.prototype.htmlencode = String.prototype.htmlencode || function () {
	let str = this.toString();
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/(?:t| |v|r)*n/g, '<br />');
	str = str.replace(/  /g, '&nbsp; ');
	str = str.replace(/t/g, '&nbsp; &nbsp; ');
	str = str.replace(/x22/g, '&quot;');
	str = str.replace(/x27/g, '&#39;');
	return str;
};

String.prototype.htmldecode = String.prototype.htmldecode || function () {
	let str = this.toString();
	str = str.replace(/&amp;/gi, '&');
	str = str.replace(/&nbsp;/gi, ' ');
	str = str.replace(/&quot;/gi, '"');
	str = str.replace(/&#39;/g, "'");
	str = str.replace(/&lt;/gi, '<');
	str = str.replace(/&gt;/gi, '>');
	str = str.replace(/<br[^>]*>(?:(rn)|r|n)?/gi, 'n');
	return str;
}


/*======================================================================*/

/*=========================Array方法扩展=================================*/

/**
 * 把对象转为Array对象
 * 可转换NodeList,arguments等
 *   obj
 * @returns {*}
 */
Array.prototype.toArray = Array.prototype.toArray || function (obj) {
	var err;
	try {
		var ls = [];
		for (var i = 0; i < obj.length; i++) {
			ls.push(obj[i]);
		}
		return ls;
	} catch (err) {
		return null;
	}
};

/**
 * 移除数组中的成员
 *   obj
 * @returns {Array}
 */
Array.prototype.removeItem = Array.prototype.removeItem || function (obj) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == obj) {
			for (var j = i; j < this.length - 1; j++) {
				this[j] = this[j + 1];
			}
			this.pop();
		}
	}
	return this;
};

/**
 * 移除数组中的成员
 * 相比removeItem速度要快,但循序不能维持原状
 *   obj
 * @returns {Array}
 */
Array.prototype.removeItemFast = Array.prototype.removeItemFast || function (obj) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == obj) {
			this[i] = this[this.length - 1];
			this.pop();
		}
	}
	return this;
};

/**
 * 移除数组中所有成员
 * @returns {Array}
 */
Array.prototype.removeAll = Array.prototype.removeAll || function () {
	while (this.length != 0) {
		this.pop();
	}
	return this;
};

/**
 * 效果与concat效果相似
 * 区别在于pushAll将修改源数组
 *   list
 * @returns {Array}
 */
Array.prototype.pushAll = Array.prototype.pushAll || function (list) {
	for (var i = 0; i < list.length; i++) {
		this.push(list[i]);
	}
	return this;
};

/**
 * 将一个或多个成员插入到指定位置
 * @returns {Array}
 */
Array.prototype.insert = Array.prototype.insert || function () {
	if (arguments.length == 1) {
		this.push(arguments[0]);
	}

	var index = Number(arguments[0]);
	if (arguments.length > 1 && index >= 0 && index < this.length) {
		var items = Array.toArray(arguments).slice(1);
		var hl = this.slice(0, index);
		var fl = this.slice(index, this.length);
		this.removeAll();
		this.pushAll(hl.concat(items).concat(fl));
	}
	return this;
};

/**
 * 将一个或多个数组中的所有成员插入到指定位置
 * @returns {Array}
 */
Array.prototype.insertAll = Array.prototype.insertAll || function () {
	if (arguments.length == 1) {
		this.pushAll(arguments[0]);
	}

	var index = Number(arguments[0]);
	if (arguments.length > 1 && index >= 0 && index < this.length) {
		var items = Array.toArray(arguments).slice(1);
		var concatItems = [];
		for (var i = 0; i < items.length; i++) {
			concatItems.pushAll(items[i]);
		}
		var hl = this.slice(0, index);
		var fl = this.slice(index, this.length);
		this.removeAll();
		this.pushAll(hl.concat(concatItems).concat(fl));
	}
	return this;
};

/**
 * 用于判断数组中是否存在对应的值
 *   {Array} obj
 * @return {boolean}
 */
Array.prototype.container = Array.prototype.container || function (obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
};

/*=======================================================================*/

/*=========================Date方法扩展===================================*/

Date.prototype.getDateObject = Date.prototype.getDateObject || function (dateObject) {
	if (typeof dateObject === 'string') {
		return this.parseDateTime(dateObject);
	}
	if (dateObject instanceof Date) {
		return dateObject;
	}
	if (!isNaN(dateObject)) {
		return new Date(dateObject);
	}
	return null;
};

Date.prototype.addDays = Date.prototype.addDays || function (dateObject, day) {
	dateObject = this.getDateObject(dateObject);
	if (dateObject instanceof Date) return new Date(dateObject.getTime() + (Number(day) * 60 * 1000 * 60 * 24));
	return null;
};

Date.prototype.addHours = Date.prototype.addHours || function (dateObject, hours) {
	dateObject = this.getDateObject(dateObject);
	if (dateObject instanceof Date) return new Date(dateObject.getTime() + (Number(hours) * 60 * 60 * 1000));
	return null;
};

Date.prototype.addMinutes = Date.prototype.addMinutes || function (dateObject, minutes) {
	dateObject = this.getDateObject(dateObject);
	if (dateObject instanceof Date) return new Date(dateObject.getTime() + (Number(minutes) * 60 * 1000));
	return null;
};

Date.prototype.getWeek = Date.prototype.getWeek || function (dateObject) {
	dateObject = this.getDateObject(dateObject);
	if (dateObject instanceof Date) {
		return dateObject.getDay();
	}
	return null;
};

/**
 * 比较两个日期的大小
 *   date1 第一个比较日期
 *   date2 第二个比较日期
 * @returns {number} 0表示date1等于date2，1表示date1大于date2，-1表示date1小于date2
 * @constructor
 */
Date.prototype.compare = Date.prototype.compare || function (date1, date2) {
	date1 = this.getDateObject(date1);
	date2 = this.getDateObject(date2);
	if (!date1 || !date2) {
		console.error('time is not a Date.');
		throw 'time is not a Date.';
	}

	if (date1.getTime() > date2.getTime())
		return 1;
	else if (date1.getTime() < date2.getTime())
		return -1;
	else if (date1.getTime() === date2.getTime())
		return 0;

};

/**
 * 日期是否相等
 *   dateObject
 * @returns {boolean}
 */
Date.prototype.equals = Date.prototype.equals || function (dateObject) {
	var time = this.getDateObject(dateObject);
	if (!time) {
		console.error('time is not a Date.');
		throw 'time is not a Date.';
	}
	return this.getTime() === time.getTime();
};

/**
 * 日期格式化
 *   format 日期格式字符串
 * @returns {XML|void|string}
 * @constructor
 */
Date.prototype.format = Date.prototype.format || function (format) {
	if (!format) format = 'yyyy-MM-dd';
	var dict = {
		'yyyy': this.getFullYear(),
		'M': this.getMonth() + 1,
		'd': this.getDate(),
		'H': this.getHours(),
		'm': this.getMinutes(),
		's': this.getSeconds(),
		'MM': ('' + (this.getMonth() + 101)).substr(1),
		'dd': ('' + (this.getDate() + 100)).substr(1),
		'HH': ('' + (this.getHours() + 100)).substr(1),
		'mm': ('' + (this.getMinutes() + 100)).substr(1),
		'ss': ('' + (this.getSeconds() + 100)).substr(1)
	};
	return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
		return dict[arguments[0]];
	});
};

/*=======================================================================*/

/**
 * 加法函数，用来得到精确的加法较为精确的结果
 *   {} arg
 * @returns {} 加上arg的精确结果
 */
Number.prototype.add = Number.prototype.add || function (arg) {
	var r1, r2;
	try {
		r1 = this.toString().split('.')[1].length;
	}
	catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg.toString().split('.')[1].length;
	}
	catch (e) {
		r2 = 0;
	}
	var m = Math.pow(10, Math.max(r1, r2));
	return Math.round(this * m + arg * m) / m;
};

/**
 * 减法函数，用来得到精确的加法较为精确的结果
 *   {} arg
 * @returns {} 减去arg的精确结果
 */
Number.prototype.sub = Number.prototype.sub || function (arg) {
	var r1, r2;
	try {
		r1 = this.toString().split('.')[1].length;
	}
	catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg.toString().split('.')[1].length;
	}
	catch (e) {
		r2 = 0;
	}
	var m = Math.pow(10, Math.max(r1, r2));
	return Math.round(this * m - arg * m) / m;
};

/**
 * 乘法函数，用来得到精确的乘法较为精确的结果
 *   {} arg
 * @returns {} 乘以arg的精确结果
 */
Number.prototype.mul = Number.prototype.mul || function (arg) {
	var m = 0, s1 = arg.toString(), s2 = this.toString();
	try {
		m += s1.split('.')[1].length;
	}
	catch (e) {
	}
	try {
		m += s2.split('.')[1].length;
	}
	catch (e) {
	}
	return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};

/**
 * 除法函数，用来得到精确的除法较为精确的结果
 *   {} arg
 * @returns {} 除以arg的精确结果
 */
Number.prototype.div = Number.prototype.div || function (arg) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = this.toString().split('.')[1].length;
	}
	catch (e) {
	}
	try {
		t2 = arg.toString().split('.')[1].length;
	}
	catch (e) {
	}
	r1 = Number(this.toString().replace('.', ''));
	r2 = Number(arg.toString().replace('.', ''));
	return (r1 / r2) * pow(10, t2 - t1);
};

/**
 * 求余函数，用来得到精确的乘法较为精确的结果
 *   {} arg
 * @returns {} 求余arg的精确结果
 */
Number.prototype.sur = Number.prototype.sur || function (arg) {
	var r1, r2;
	try {
		r1 = this.toString().split('.')[1].length;
	}
	catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg.toString().split('.')[1].length;
	}
	catch (e) {
		r2 = 0;
	}
	var m = Math.pow(10, Math.max(r1, r2));
	return ((this * m) % (arg * m)) / m;

};

/**
 * 小数格式化显示
 *   decimalLen 小数位数(默认2位)
 * @returns {string}
 * @constructor
 */
Number.prototype.decimalFormat = Number.prototype.decimalFormat || function (decimalLen) {
	decimalLen = parseInt(decimalLen || 2);
	var decimalNum = Math.round((this - Math.floor(this)) * 100).toString().padLeft(decimalLen, '0'),
		intNum = Math.floor(this);
	if (decimalLen === 0) {
		return '<span>' + intNum + '</span>';
	}
	else {
		return '<span>' + intNum + '.</span><span style="font-size:1.5rem;">' + decimalNum + '</span>';
	}
};

/**
 * 格式化数字
 *   decimalLen 小数位数(默认2位)
 * @returns {string}
 * @constructor
 */
Number.prototype.roundNum = Number.prototype.roundNum || function (decimalLen) {
	if (this == 0 || (typeof decimalLen === 'undefined')) {
		return this;
	}
	decimalLen = parseInt(decimalLen || 2);
	var result = this;
	var isNegative = 1;
	if (this < 0) {
		result = -1 * result;
		isNegative = -1;
	}

	var formatNum = result / Math.pow(10, 8);
	if (formatNum > 1) {
		result = Math.round(formatNum * Math.pow(10, (decimalLen + 1))) / Math.pow(10, (decimalLen + 1));

		return (isNegative * result).toFixed(decimalLen) + '亿';
	}
	formatNum = formatNum * Math.pow(10, 3);
	if (formatNum > 1) {
		result = Math.round(formatNum * 10 * Math.pow(10, (decimalLen + 1))) / Math.pow(10, (decimalLen + 1));

		return (isNegative * result).toFixed(decimalLen) + '万';
	}

	return (isNegative * result).toFixed(decimalLen);
};

/**
 * 保留N位小数(四舍五入)
 *   len 小数位数(默认2位)
 * @returns {number}
 * @constructor
 */
Number.prototype.toFixed = function (len) {
	let lens = len || 0;
	let result = Math.round(this * Math.pow(10, lens)) / Math.pow(10, lens);
	let str = result.toString();
	let rs = str.indexOf(".");
	if (lens !== 0 && rs < 0) {
		rs = str.length;
		str += "."
	}
	let time = 0;
	while ((str.length <= rs + lens) && time < 10) {
		str += "0";
		time++;
	}
	if (time === 10) {
        console.warn(`数据${this}保留${lens}位小数有异常，需要详细检查`);
	}
	return str;
};

String.prototype.roundNum = String.prototype.roundNum || function (decimalLen) {
	if (isNaN(Number(this))) {
		return '--';
	}
	return Number(this).roundNum(decimalLen);
};

Map.prototype.toKeyArray = Map.prototype.toKeyArray || function () {
	var arr = new Array(), count = 0;
	for (var key of this.keys()) {
		arr[count] = key;
		count++;
	}
	return arr;
};

Map.prototype.toValueArray = Map.prototype.toValueArray || function () {
	var arr = new Array(), count = 0;
	for (var key of this.values()) {
		arr[count] = key;
		count++;
	}
	return arr;
};

/**
 * 格式化成金额显示(含千分号)
 *   len 小数位数(默认2位)
 * @returns {number}
 * @constructor
 */
Number.prototype.toMoney = function (len){
	let lens = len || 2;
	let num = (this).toFixed(lens);
	let result = "";
	if(num.indexOf('.') !== -1){
		result = num.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1){ return $1 + "," });
	} else {
		result = num.replace(/(\d)(?=(\d{3}))/g, function($0, $1){ return $1 + "," });
	}
	return num && result;
}
