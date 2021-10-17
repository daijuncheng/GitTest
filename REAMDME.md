# 数组专题

```js
const arr = [1, 2, 3, 4, 5, 6, 7];

// 操作数组
// 增
arr.push(1); // 在后面加
arr.unshift(1); // 在前面加
// 删
arr.pop(); // 从后面删一个
arr.shift(); // 从前面删一个
arr.splice(起始位置, 删除的个数); // 从中间删
// 改
arr[i] = 2;
// 查
console.log(arr[0]); // arr的第0项
// ...
```

## 查找相关

```js
// 筛选
const newArr = arr.filter(function (item, i) {
  return item % 2 === 0; // 条件
});

// 查找第一个匹配项
const num = arr.find(function (item, i) {
  return item % 2 === 0; // 条件
});

// 查找第一个匹配项的索引
const idx = arr.findIndex(function (item, i) {
  return item % 2 === 0; // 条件
});

// 查找是否有匹配项
const boo = arr.some(function (item, i) {
  return item % 2 === 1; // 条件
});

// 检查是否每一项都是偶数
const boo = arr.every(function (item, i) {
  return item % 2 === 0; // 条件
});

// 查找第一个匹配项的索引（low）
const idx = arr.indexOf(2); // 1

// 查找是否有匹配项
const boo = arr.includes(2); // true

// 手动实现按条件筛选
function getEvens (arr) {
  const evens = [];
  for (const item of arr) {
    if (item % 2 === 0) {
      evens.push(item);
    }
  }
  return evens;
}

// 手动实现查找第一个匹配项
// 找数组中第一个偶数
function getExpect (arr) {
    for (const num of arr) {
        if (num % 2 === 0) {
            return num;
        }
    }
    return null;
}

// 手动实现查找第一个匹配项的索引
// 找数组中第一个偶数
function getExpectIndex (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 0) {
        return i;
      }
    }
    return -1;
}

// 手动实现查找数组中有没有奇数
function hasOdd (arr) {
    for (const item of arr) {
        if (item % 2 !== 0) {
            return true;
        }
    }
    return false;
}

// 手动实现检查是否每一项都是偶数
function isAllEven (arr) {
    for (const item of arr) {
        if (item % 2 !== 0) {
            return false;
        }
    }
    return true;
}
```

## arr.sort

```js
const arr = [1, 3, 2, 4];
arr.sort(); // 1, 2, 3, 4
const arr1 = [2, 11, 3, 'b', 'a'];
// 默认按unicode排序
arr1.sort(); // 11, 2, 3, 'a', 'b'

arr1.sort(function (a, b) {
	return a - b;
});

Array.prototype.mass = function () {
  // return this.sort(function () {
  //  return Math.random() - .5; // 50%几率小于0  50%几率大于0  
  // });
  return this.sort(() => Math.random() - .5); // 50%几率小于0  50%几率大于0  
  });
};
```

## arr.map

```js
// 经典面试题
const list = [1, 2, 3, 4, 5];
list.map(parseInt); // list: 

list.map(function (item, i) {
  // 2, 0 >>> 10
  // 4, 1 >>> NaN
  // 6, 2 >>> NaN
  // 8, 3 >>> NaN
  // ...
  // 20, 9
  // 22, 10 >>> 22
  return parseInt(item, i);
});

// (1, 0) (2, 1)
list.map(Math.max); // [1, 2, 3, 4, 5]
list.map(Math.min); // [0, 1, 2, 3, 4]
// 1^0  2^1  3^2  4^3   5^4
list.map(Math.pow); // [1, 2, 9, 64, 625]
```

## arr.forEach

```js
const arr = [1, 2, 3, 4];
arr.forEach(function (item, i) {
  // to do
  console.log(item, i); // 啥都有
  // break; // 不能break; 不能打断
});

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i], i); // 啥都有
  break;
}

for (const item of arr) {
  console.log(item); // 没有索引
  break;
}
```

## arr.reduce

```js
const arr = [1, 2, 3, 4, 5];

function getSum (arr) {
  return arr.reduce(function (prevResult, currentItem) {
    return prevResult + currentItem;
  });
}

console.log(getSum(arr)); // 15
```

## arr.concat

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.concat([6, 7])); // [1, 2, 3, 4, 5, 6, 7]
console.log(arr.concat(6)); // [1, 2, 3, 4, 5, 6]
```
