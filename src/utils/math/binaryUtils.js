/**
 * Created by Muchinfo on 2017/7/14.
 * 二进制工具类
 */

class BinaryUtil {
  /**
   * 将无符号整型数值型转化为二进制数组的方法
   *   value             无符号整型数值
   *   isLittleEndian    是否小端
   *   length            长度
   * @returns {*}
   */
  uIntToByteArray (value, isLittleEndian, length) {
    let dataView = new DataView((new Uint8Array(length)).buffer);
    switch (length) {
      case 2:
        dataView.setUint16(0, value, isLittleEndian);

        break;
      case 4:
        dataView.setUint32(0, value, isLittleEndian);

        break;
      case 8:
        dataView.setFloat64(0, value, isLittleEndian);

        break;
      default:
        return {};
    }

    let array = new Uint8Array(dataView.buffer);

    return array;
  }

  /**
   * 将二进制数组转化为无符号整型数值的方法
   *   array             二进制数组
   *   islittleEndian    是否小端
   * @returns {number}
   */
  byteArrayToUInt (array, isLittleEndian) {
    let dataView = new DataView((new Uint8Array(array).buffer));
    let value = 0;
    switch (array.length) {
      case 2:
        value = dataView.getUint16(0, isLittleEndian);

        return value;
      case 4:
        value = dataView.getUint32(0, isLittleEndian);

        return value;
      default:
        return 0;
    }
  }

  /**
   * 将二进制数组转化为Float64的方法
   *   array 二进制数组
   *   isLittleEndian 是否大小端
   * @returns {number}
   */
  byteArrayToFloat (array, isLittleEndian) {
    let dataView = new DataView(new Uint8Array(array).buffer);
    if (!!array && array.length === 8) {
      return dataView.getFloat64(0, isLittleEndian);
    }
    return 0;
  }

  /**
   * 将Float64转化为二进制数组的方法
   *   value Float64
   *   isLittleEndian 是否大小端 为true
   *   length            长度
   * @returns {number}
   */
  floatTobByteArray (value, isLittleEndian, length) {
    let dataView = new DataView((new Uint8Array(length)).buffer);
    if (!!length && length === 8) {
      dataView.setFloat64(0, value, isLittleEndian);
      let array = new Uint8Array(dataView.buffer);

      return array;
    }
    return 0;
  }

  /**
   * 将字符串转化为二进制数组的方法
   *   value             字符串
   *   islittleEndian    是否小端
   * @returns {Uint8Array}
   */
  stringToByteArray (value, isLittleEndian) {
    let buf = [];
    let offset = 0;
    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) > 255) {
        let tmp = this.uIntToByteArray(value.charCodeAt(i), isLittleEndian, 2);
        buf[i + offset] = tmp[0];
        buf[i + offset + 1] = tmp[1];

        offset++;
      } else {
        buf[i + offset] = value.charCodeAt(i);
      }
    }

    return new Uint8Array(buf);
  }

  bigEndianByteArrayToUInt64 (srcArray) {
    if (!(srcArray instanceof Uint8Array)) {
      return -1;
    }
    if (srcArray.length !== 8) {
      return -1;
    }
    return ((((srcArray[0] & 0xff) << 56) |
      ((srcArray[1] & 0xff) << 48) |
      ((srcArray[2] & 0xff) << 40) |
      ((srcArray[3] & 0xff) << 32) |
      ((srcArray[4] & 0xff) << 24) |
      ((srcArray[5] & 0xff) << 16) |
      ((srcArray[6] & 0xff) << 8) |
      ((srcArray[7] & 0xff) << 0)
    ));
  }

  uft8ByteToString (utf8Bytes) {
    return decodeURIComponent(escape(utf8Bytes));
  }

  utf8ByteToUnicodeStr (utf8Bytes) {
    var unicodeStr = '';
    for (var pos = 0; pos < utf8Bytes.length;) {
      var flag = utf8Bytes[pos];
      var unicode = 0;
      // 特殊情况，Unicode为0时，代表是null
      if (flag === 0) {
        pos += 1;
        continue;
      }

      if ((flag >>> 7) === 0) {
        unicodeStr += String.fromCharCode(utf8Bytes[pos]);
        pos += 1;
      } else if ((flag & 0xFC) === 0xFC) {
        unicode = (utf8Bytes[pos] & 0x3) << 30;
        unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24;
        unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18;
        unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 5] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 6;
      } else if ((flag & 0xF8) === 0xF8) {
        unicode = (utf8Bytes[pos] & 0x7) << 24;
        unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18;
        unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 4] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 5;
      } else if ((flag & 0xF0) === 0xF0) {
        unicode = (utf8Bytes[pos] & 0xF) << 18;
        unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12;
        unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 3] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 4;
      } else if ((flag & 0xE0) === 0xE0) {
        unicode = (utf8Bytes[pos] & 0x1F) << 12;
        unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 2] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 3;
      } else if ((flag & 0xC0) === 0xC0) { // 110
        unicode = (utf8Bytes[pos] & 0x3F) << 6;
        unicode |= (utf8Bytes[pos + 1] & 0x3F);
        unicodeStr += String.fromCharCode(unicode);
        pos += 2;
      } else {
        unicodeStr += String.fromCharCode(utf8Bytes[pos]);
        pos += 1;
      }
    }
    return unicodeStr;
  }

  /**
   * 将双字节Array转化为Hex Ascii Array的方法
   * @param array
   * @returns {Uint8Array}
   */
  uInt8ArrayToHexUInt8Array (array) {
    let str = String.fromCharCode.apply(null, array);

    let tempArray = [];
    for (let i = 0; i < str.length; i += 2) {
      tempArray[i / 2] = parseInt(str.substr(i, 2), 16);
    }

    let returnArray = new Uint8Array(tempArray);
    return returnArray;
  }
}

const binaryUtil = new BinaryUtil();
export default binaryUtil;
