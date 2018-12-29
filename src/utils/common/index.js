import QueryCommonParam from '@/business/queryCommon/queryCommonParam';
import _ from 'loadsh';
import { stringify } from 'postcss';

export const convertCommonParam = obj => {
	let params = [];
	// 遍历属性并赋值
	for (let [key, val] of Object.entries(obj)) {
		let moQueryCommonParam = new QueryCommonParam(key, String(val));
        params.push(moQueryCommonParam);
	}
	return params;
};



export const convertField = arr => {

	function isObject (o) {
		return Object.prototype.toString.call(o) === '[object Object]';
	}

	let resultArr = arr.map(item => {
		let obj = {};
		for (let [key, val] of Object.entries(item)) {
			obj[key.toLowerCase()] = val;
		}
		return obj;
	});
	return resultArr;
}

export const getType = val => {
    let class2type = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Object]': 'object',
        '[object Error]': 'error',
    };
    if (val === null) return 'null';
    let result = 'string';
    if (typeof val === 'object' || typeof val === 'function') {
        result = class2type[class2type.toString.call(val)];
    } else {
        result = typeof val;
    }
    return result;
}

export const parseField = (model, arr) => {
    if (arr && arr.length > 0) {
        let resultArr = arr.map(item => {
			let obj = _.cloneDeep(model);
            for (let mKey of Object.keys(model)) {
                for (let [key, val] of Object.entries(item)) {
                    if (mKey.toLowerCase() === key.toLowerCase()) {
                        switch (getType(obj[mKey])) {
                            case 'number':
                                if (String(val).length > 16) {
                                    obj[mKey] = window.Long.fromString(val);
                                } else {
                                    obj[mKey] = Number(val);
                                }
                                break;
                            case 'date':
                                obj[mKey] = new Date(Number(val));
                                break;
                            default:
                                obj[mKey] = val ? String(val) : '';
                                break;
                        }

                    }
                }
            }
            return obj;
        });
        return resultArr;
    } else {
        return [];
    }
}


