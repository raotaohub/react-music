/*
 * @Author: raotaohub
 * @Date: 2021-02-15 17:05:15
 * @LastEditTime: 2021-03-05 20:51:58
 * @LastEditors: raotaohub
 * @FilePath: \react-music\src\api\storage.js
 * @Description: 本地存储模块
 */
const read = val => JSON.parse(val);
const write = val => JSON.stringify(val);

// 本地存储模块
export const getItem = name => {
  // 获取本地数据
  const data = window.localStorage.getItem(name);
  try {
    // 尝试把 data 转换成 JS 对象
    return JSON.parse(data);
  } catch (err) {
    // 若 data 不是JSON格式的字符串 直接返回
    return data;
  }
};

// 新建本地数据
export const setItem = (name, val) => {
  // 如果val是对象 需要转换成字符串
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  window.localStorage.setItem(name, val);
};
// 删除本地数据
export const removeItem = name => {
  window.localStorage.removeItem(name);
};

export function useStorage(key, defaultValue, storage = window.localStorage) {
  let value = defaultValue;

  const readData = () => {
    if (!storage) return; // 2.1

    try {
      const rawValue = storage.getItem(key); // 2.2 先根据key读取原始数据

      if (rawValue === null) {
        // 2.3 先判断ramValue是否有值
        // 进一步
        // 2.3.1 进一步判断调用者是否传入 defaultValue ，若无说明调用者要设置新值
        if (defaultValue) storage.setItem(key, write(defaultValue));
      } else {
        // 2.3.2 若有 defaultValue ，若有调用者要读取值
        value = read(rawValue) || defaultValue;
      }
    } catch (error) {
      console.warn(error);
    }
  }; // 2

  const setData = data => {
    if (data === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, write(data));
    }
  };

  readData(); // 1

  return [value, setData];
}
