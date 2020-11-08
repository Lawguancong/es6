import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>数组的扩展</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`

关于数组
数组是一种类列表对象，它的原型中提供了遍历和修改元素的相关操作。JavaScript 数组的长度和元素类型都是非固定的。
因为数组的长度可随时改变，并且其数据在内存中也可以不连续，所以 JavaScript 数组不一定是密集型的，这取决于它的使用方式。
一般来说，数组的这些特性会给使用带来方便，但如果这些特性不适用于你的特定使用场景的话，可以考虑使用类型数组 TypedArray。

只能用整数作为数组元素的索引，而不能用字符串。后者称为关联数组。使用非整数并通过方括号或点号来访问或设置数组元素时，所操作的并不是数组列表中的元素，而是数组对象的属性集合上的变量。
数组对象的属性和数组元素列表是分开存储的，并且数组的遍历和修改操作也不能作用于这些命名属性。



1.扩展运算符 (spread) (...)
相反：它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

// ES5 的写法
Math.max.apply(null, [14, 3, 77])
// ES6 的写法
Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77);



说明 apply 和 call 参数的区别
// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);

扩展运算符的应用
扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。

浅拷贝
（1）复制数组
数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。（指向地址的指针不变，数据是否可变取决于数据类型）
const a1 = [1, 2];
const a2 = a1;
a2[0] = 4;
a1 // [2, 2]
上面代码中，a2并不是a1的克隆，而是指向同一份数据的另一个指针。修改a2，会直接导致a1的变化。

ES5 只能用变通方法来复制数组。
const a1 = [1, 2];
const a2 = a1.concat();
a2[0] = 4;
a1 // [1, 2]
上面代码中，a1会返回原数组的克隆，再修改a2就不会对a1产生影响。

扩展运算符提供了复制数组的简便写法。
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
上面的两种写法，a2都是a1的克隆。


（2）合并数组
扩展运算符提供了数组合并的新写法。
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
不过，这两种方法都是浅拷贝，使用的时候需要注意。

const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];
const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];
a3[0] === a1[0] // true
a4[0] === a1[0] // true
上面代码中，a3和a4是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。如果修改了引用指向的值，会同步反映到新数组。

// const a1 = [1, 2];
// const a2 = a1;
// // a1[0] = 3;
// // a2[0] = 4;
// console.log(a1)     
// console.log(a2)   

// const a1 = [1, 2];
// const a2 = [...a1];
// // a1[0] = 3;
// // a2[0] = 4;
// console.log(a1)     
// console.log(a2)   


// const a1 = [1, 2];
// const [...a2] = a1;
// // a1[0] = 3;
// // a2[0] = 4;
// console.log(a1)     
// console.log(a2) 


（3）与解构赋值结合
扩展运算符可以与解构赋值结合起来，用于生成数组。
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
下面是另外一些例子。
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
const [first, ...rest] = [];
first // undefined
rest  // []
const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
const [...butLast, last] = [1, 2, 3, 4, 5];   // 有待es优化
// 报错
const [first, ...middle, last] = [1, 2, 3, 4, 5];   // 有待es优化
// 报错


const arr = [1, 2, 3, 4, 5];
const [...rest] = arr
arr[1] = 22222;
console.log(arr) // [1, 22222, 3, 4, 5]
console.log(rest) // [1, 2, 3, 4, 5]

（4）字符串
扩展运算符还可以将字符串转为真正的数组。
[...'hello']
// [ "h", "e", "l", "l", "o" ]


（5）实现了 Iterator 接口的对象
任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
上面代码中，querySelectorAll方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。

可以改为使用Array.from方法将arrayLike转为真正的数组。


2.Array.from() 
Array.from方法 从类数组对象或者可迭代对象中创建一个新的数组实例。
一：类似数组的对象（array-like object）  本质上有 length 属性 类数组
二：可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。 有 Symbol.iterable 遍历接口 可迭代对象

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']
上面代码中，字符串和 Set 结构都具有 Iterator 接口，因此可以被Array.from转为真正的数组。
  

Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
Array.from({ length: 3 });
// [ undefined, undefined, undefined ]


3.Array.of()
Array.of方法用于将一组值，转换为数组。
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
上面代码中，Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。

Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

Array.of方法可以用下面的代码模拟实现。

function ArrayOf(){
  return [].slice.call(arguments);
}


4.数组实例的 copyWithin()  return -> 改变原数组

数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
Array.prototype.copyWithin(target, start = 0, end = this.length)
target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

这三个参数都应该是数值，如果不是，会自动转为数值。

[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
上面代码表示将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2。
下面是更多例子。
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]
// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]
// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}
// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]
// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]


5.数组实例的 find() 和 findIndex()
find() -> 找出第一个符合条件的 value，否则 undefined
findIndex() -> 找出第一个符合条件的 index， 否则 -1
数组实例的find方法，用于找出第一个符合条件的数组成员。
它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。
如果没有符合条件的成员，则返回undefined。


6.数组实例的 fill()

会有内存指针问题 

['a', 'b', 'c'].fill(7)
// [7, 7, 7]
new Array(3).fill(7)
// [7, 7, 7]
上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
面代码表示，fill方法从 1 号位开始，向原数组填充 7，到 2 号位之前结束。


注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
let arr = new Array(3).fill({name: "Mike"});
arr[0].name = "Ben";
arr
// [{name: "Ben"}, {name: "Ben"}, {name: "Ben"}]
let arr = new Array(3).fill([]);
arr[0].push(5);
arr
// [[5], [5], [5]]


7.数组实例的 entries()，keys() 和 values()
ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），
可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。

let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries)
// Array Iterator {}
console.log(entries.next());
// {
//     done: false,
//     value: [0, 'a']
// }
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']




8.数组实例的 includes() return boolean
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。

[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true


indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。
[NaN].indexOf(NaN)
// -1
includes使用的是不一样的判断算法，就没有这个问题。
[NaN].includes(NaN)
// true


9.数组实例的 flat()，flatMap() 
数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
上面代码中，原数组的成员里面有一个数组，flat()方法将子数组的成员取出来，添加在原来的位置。

flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。

[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
上面代码中，flat()的参数为2，表示要“拉平”两层的嵌套数组。

如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。

[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
如果原数组有空位，flat()方法会跳过空位。

[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。

[2, 3, 4].flatMap((x) => [x, x * 2])
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
// [2, 4, 3, 6, 4, 8]
flatMap()只能展开一层数组。

[1, 2, 3, 4].flatMap(x => [[x * 2]])
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
// [[2], [4], [6], [8]]
上面代码中，遍历函数返回的是一个双层的数组，但是默认只能展开一层，因此flatMap()返回的还是一个嵌套数组。

flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。

arr.flatMap(function callback(currentValue[, index[, array]]) {
  // ...
}[, thisArg])
flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。





10.数组的空位

ES5: 空位 -> 大部分方法直接跳过
ES6: 空位 -> undef


数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。

Array(3) // [, , ,]
上面代码中，Array(3)返回一个具有 3 个空位的数组。

注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。

0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。

ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

forEach(), filter(), reduce(), every() 和some()都会跳过空位。
map()会跳过空位，但会保留这个值
join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
ES6 则是明确将空位转为undefined。

Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

Array.from(['a',,'b'])
// [ "a", undefined, "b" ]
扩展运算符（...）也会将空位转为undefined。

[...['a',,'b']]
// [ "a", undefined, "b" ]
copyWithin()会连空位一起拷贝。

[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
fill()会将空位视为正常的数组位置。

new Array(3).fill('a') // ["a","a","a"]
for...of循环也会遍历空位。

let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
上面代码中，数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。

entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
由于空位的处理规则非常不统一，所以建议避免出现空位。





11.Array.prototype.sort() -> 稳定的

稳定：插入排序、合并排序、冒泡排序等
不稳定：堆排序、快速排序等

排序稳定性（stable sorting）是排序算法的重要属性，指的是排序关键字相同的项目，排序前后的顺序不变。

const arr = [
  'peach',
  'straw',
  'apple',
  'spork'
];

const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]
上面代码对数组arr按照首字母进行排序。排序结果中，straw在spork的前面，跟原始顺序一致，所以排序算法stableSorting是稳定排序。

const unstableSorting = (s1, s2) => {
  if (s1[0] <= s2[0]) return -1;
  return 1;
};

arr.sort(unstableSorting)
// ["apple", "peach", "spork", "straw"]
上面代码中，排序结果是spork在straw前面，跟原始顺序相反，所以排序算法unstableSorting是不稳定的。


不稳定排序的主要缺点是，多重排序时可能会产生问题。
假设有一个姓和名的列表，要求按照“姓氏为主要关键字，名字为次要关键字”进行排序。开发者可能会先按名字排序，再按姓氏进行排序。
如果排序算法是稳定的，这样就可以达到“先姓氏，后名字”的排序效果。如果是不稳定的，就不行。

早先的 ECMAScript 没有规定，Array.prototype.sort()的默认排序算法是否稳定，留给浏览器自己决定，这导致某些实现是不稳定的。
ES2019 明确规定，Array.prototype.sort()的默认排序算法必须稳定。这个规定已经做到了，现在 JavaScript 各个主要实现的默认排序算法都是稳定的。













创建数组
var fruits = ['Apple', 'Banana'];
console.log(fruits.length);
// 2

通过索引访问数组元素
var first = fruits[0];
// Apple
var last = fruits[fruits.length - 1];
// Banana

遍历数组
fruits.forEach(function (item, index, array) {
    console.log(item, index);
});
// Apple 0
// Banana 1

添加元素到数组的末尾
var newLength = fruits.push('Orange');
// newLength:3; fruits: ["Apple", "Banana", "Orange"]

删除数组末尾的元素
var last = fruits.pop(); // remove Orange (from the end)
// last: "Orange"; fruits: ["Apple", "Banana"];

删除数组最前面（头部）的元素
var first = fruits.shift(); // remove Apple from the front
// first: "Apple"; fruits: ["Banana"];

添加元素到数组的头部
var newLength = fruits.unshift('Strawberry') // add to the front
// ["Strawberry", "Banana"];

找出某个元素在数组中的索引
fruits.push('Mango');
// ["Strawberry", "Banana", "Mango"]
var pos = fruits.indexOf('Banana');
// 1

通过索引删除某个元素
var removedItem = fruits.splice(pos, 1); // this is how to remove an item
// ["Strawberry", "Mango"]

从一个索引位置删除多个元素
var vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot'];
console.log(vegetables); 
// ["Cabbage", "Turnip", "Radish", "Carrot"]
var pos = 1, n = 2;
var removedItems = vegetables.splice(pos, n);
// this is how to remove items, n defines the number of items to be removed,
// from that position(pos) onward to the end of array.
console.log(vegetables); 
// ["Cabbage", "Carrot"] (the original array is changed)
console.log(removedItems); 
// ["Turnip", "Radish"]

复制一个数组
var shallowCopy = fruits.slice(); // this is how to make a copy 
// ["Strawberry", "Mango"]


虽然数组元素可以看做是数组对象的属性，就像 toString 一样，但是下面的写法是错误的，运行时会抛出 SyntaxError 异常，而原因则是使用了非法的属性名：
console.log(arr.0); // a syntax error




                    `}
                </code>
            </pre>
        )
    }

    render() {
      // console.log(0 in [, , ,])

        return (
            <div>
                {this.renderTitle()}
                {this.renderDemo()}
            </div>
        );
    }
}