/**
 * Created by Muchinfo on 2017/6/29.
 * 加解密类
 */

import CryptoJS from 'crypto-js';
import utils from '@/utils';

// region 密钥、向量和配置声明
/**
 * AES密钥
 */
let aeskey = CryptoJS.enc.Utf8.parse('F7A72DE7D6264530F01BA49BC73EB873');

/**
 * 处理银行密钥所使用的密钥
 * @type {Uint8Array}
 */
export const bankkey = new Uint8Array([0xF7, 0xA7, 0x2D, 0xE7, 0xD6, 0x26, 0x45, 0x30, 0xF0, 0x1B, 0xA4, 0x9B, 0xC7, 0x3E, 0xB8, 0x73]);

/**
 * MAC检验码左8字节
 */
let mackeyleft = uint8ArrayToWordArray([0xB0, 0xFB, 0x83, 0xE3, 0x9A, 0x5E, 0xBF, 0xAA]);
/**
 * MAC检验码右8字节
 */
let mackeyright = uint8ArrayToWordArray([0xBE, 0x47, 0x13, 0x62, 0xA5, 0x83, 0x93, 0xFF]);
/**
 * MAC检验向量
 * @type {Uint8Array}
 */
let iv = new Uint8Array([0xD9, 0x51, 0xDB, 0xE0, 0x37, 0xC8, 0x23, 0x25]);

let AesOption = {
	mode: CryptoJS.mode.ECB,
	padding: CryptoJS.pad.Pkcs7
};
let DesOption = {
	mode: CryptoJS.mode.ECB,
	padding: CryptoJS.pad.NoPadding
};
// endregion

// region 类型转换方法
/**
 * 将Uint8Array数据转化为WordArray数据的方法
 *   arr   Uint8Array数据
 * @returns     WordArray数据
 * @constructor
 */
function uint8ArrayToWordArray (arr) {
	let word = [];
	for (let i = 0; i < arr.length; i += 4) {
		word.push(arr[i] << 24 | arr[i + 1] << 16 | arr[i + 2] << 8 | arr[i + 3] << 0);
	}

	return CryptoJS.lib.WordArray.create(word, arr.length);
}

/**
 * 将WordArray数据转化为Uint8Array数据的方法
 *   wordArray         WordArray数据
 * @returns {Uint8Array}    Uint8Array数据
 * @constructor
 */
export const wordArrayToUint8Array = (wordArray) => {
	let words = wordArray.words;
	let byteArray = [];
	for (let i = 0; i < words.length; ++i) {
		let word = words[i];
		for (let j = 3; j >= 0; --j) {
			byteArray.push((word >> 8 * j) & 0xFF);
		}
	}

	return new Uint8Array(byteArray);
};
// region DES

function des2XKey (plainText, encryptOrDecrypt, key) {
	if (key.length !== 16) {
		return null;
	}

	let keyLeft = uint8ArrayToWordArray(key.subarray(0, 8));
	let keyRight = uint8ArrayToWordArray(key.subarray(8, 16));

	let retData = null;
	if (encryptOrDecrypt === 0) {
		// Warning: 明文补足8位，iOS代码有问题
		let realText;
		let eff = plainText.length % 8;
		if (eff !== 0) {
			realText = new Uint8Array(plainText.length + 8 - eff);
			realText.set(plainText);
			realText.set(new Uint8Array(8 - eff), plainText.length);
		} else {
			realText = plainText;
		}

		let data1 = CryptoJS.DES.encrypt(uint8ArrayToWordArray(realText), keyLeft, DesOption);
		let data2 = CryptoJS.DES.decrypt(data1, keyRight, DesOption);
		retData = CryptoJS.DES.encrypt(data2, keyLeft, DesOption);

		let retBase64 = CryptoJS.enc.Base64.parse(retData.toString());
		return wordArrayToUint8Array(retBase64);
	} else {
		let data1 = CryptoJS.DES.decrypt({
			ciphertext: uint8ArrayToWordArray(plainText)
		}, keyLeft, DesOption);
		let data2 = CryptoJS.DES.encrypt(data1, keyRight, DesOption);
		retData = CryptoJS.DES.decrypt(data2, keyLeft, DesOption);

		return wordArrayToUint8Array(retData);
	}
};

// endregion

// region MAC校检相关
/**
 * MAC校检码生成子方法
 *   plainText
 *   key
 * @returns {*}
 */
export const DataMacAnsiX99 = (plainText, key) => {
	if (plainText.length % 8 !== 0) {
		return null;
	}

	let macData = new Uint8Array(8);
	macData.set(iv, 0);

	let xorData = new Uint8Array(8);
	for (let i = 0; i < plainText.length; i += 8) {
		for (let j = 0; j < 8; j++) {
			xorData[j] = macData[j] ^ plainText[i + j];
		}

		let desData = CryptoJS.DES.encrypt(uint8ArrayToWordArray(xorData), key, DesOption);
		let desBase64 = CryptoJS.enc.Base64.parse(desData.toString());
		let desArray = wordArrayToUint8Array(desBase64);
		for (let k = 0; k < desArray.length; k++) {
			macData[k] = desArray[k];
		}
	}

	return macData;
};

/**
 * MAC校检码生成方法
 *   plainText
 * @returns {*}
 */
export const DataMacAnsiX919 = (plainText) => {
	let data1 = DataMacAnsiX99(plainText, mackeyleft);
	if (data1 === null) {
		return null;
	}

	// 这里的 ciphertext 是个坑
	let data2 = CryptoJS.DES.decrypt({
		ciphertext: uint8ArrayToWordArray(data1)
	}, mackeyright, DesOption);
	let retData = CryptoJS.DES.encrypt(data2, mackeyleft, DesOption);
	let retBase64 = CryptoJS.enc.Base64.parse(retData.toString());

	return wordArrayToUint8Array(retBase64);
};

// endregion

// region 5.0报文加解密

/**
 * 5.0报文数据加密方法
 *   plainText 明文
 * @returns {*}     密文
 */
export const encrypt = (plainText) => {
	if (plainText === null) {
		return null;
	}

	let a = CryptoJS.AES.encrypt(uint8ArrayToWordArray(plainText), aeskey, AesOption);
	let a1 = CryptoJS.enc.Base64.parse(a.toString());
	let a2 = wordArrayToUint8Array(a1);

	let data1 = new Uint8Array(4 + a2.length + 8);
	let lengthArray = utils.binaryUtils.uIntToByteArray(plainText.length, true, 4);
	data1.set(lengthArray);
	data1.set(a2, 4);

	let mDataTemp = new Uint8Array(8);
	mDataTemp.set(lengthArray);
	mDataTemp.set(new Uint8Array(4), 4);
	let macData = DataMacAnsiX919(mDataTemp);
	if (macData === null) {
		return null;
	}
	data1.set(macData, 4 + a2.length);
	return data1;
};

/**
 * 5.0报文数据解密方法
 *   encryptData   密文
 *   size          明文长度
 * @returns {*}         明文F
 */
export const decrypt = (encryptData, size) => {
	let decrytped = CryptoJS.AES.decrypt({
		ciphertext: uint8ArrayToWordArray(encryptData)
	}, aeskey, AesOption);

	let a = wordArrayToUint8Array(decrytped);
	if (a.length < size) {
		return null;
	}

	return a.subarray(0, size);
};

// endregion

// region 银行加解密相关

/**
 * 银行数据加密方法
 *   plainText 明文
 *   key       密钥
 * @returns {*}     密文
 */
export const Encrypt3Des = (plainText, key) => {
	if (plainText === null) {
		return null;
	}
	let a = des2XKey(plainText, 0, key);
	// let a1 = CryptoJS.enc.Base64.parse(a.toString());
	// let a2 = wordArrayToUint8Array(a1);

	// let data1 = new Uint8Array(4+a2.length+8);
	let data1 = new Uint8Array(4 + a.length + 8);
	let lengthArray = utils.binaryUtils.uIntToByteArray(plainText.length, true, 4);
	data1.set(lengthArray);
	// data1.set(a2, 4);
	data1.set(a, 4);

	let mDataTemp = new Uint8Array(8);
	mDataTemp.set(lengthArray);
	mDataTemp.set(new Uint8Array(4), 4);
	let macData = DataMacAnsiX919(mDataTemp);
	if (macData === null) {
		return null;
	}
	// data1.set(macData, 4+a2.length);
	data1.set(macData, 4 + a.length);

	return data1;
};

/**
 * 银行数据解密方法
 *   encryptData   密文
 *   key           密钥
 */
export const Decrypt3Des = (encryptData, key) => {
	let retData = des2XKey(encryptData, 1, key);

	return retData;
};

// endregion
