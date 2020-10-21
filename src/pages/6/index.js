import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>数值的扩展</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`

JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。
一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。
二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。

console.log(9007199254740991.123456789012345678901234567890123456789012345678901234567890) //9007199254740991
console.log(0.123456789012345678901234567890123456789012345678901234567890) //0.12345678901234568 小数位 18位
console.log(0.000000000000000000000000000000000000001) // 1e-39


二进制(Binary):    0b / 0B。
八进制(Octal):     0o / 0O。
十进制(Decimal):   无
十六进制(Hex):     0x / 0X。

Number('0b111')  // 7
Number('0o10')  // 8

(123456).toString(2);
(123456).toString(4);
(123456).toString(6);

除了十进制是数值， 其它是字符串

建议第三方库
内置方法有bug

Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false

52位 二进制
JavaScript 能够准确表示的整数范围在，超过这个范围，无法精确表示这个值。（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃
-2^53到2^53之间（不含两个端点） -> -(2^53 - 1) ~ +(2^53 -1); 超出范围，计算精度有问题，不准确。
53位二进制数 
（相当于 16 个十进制位）
2^53 = 9,007,199,254,740,992

// 超过 2 的 1024 次方的数值，无法表示
大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity(Finity)
Math.pow(2, 1024) // Infinity

console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1) // true
console.log(Math.pow(2, 52) === Math.pow(2, 52) + 1) // false

超出 2 的 53 次方之后，一个数就不精确了。

console.log(Math.pow(2, 53)) // 9007199254740992

console.log(9007199254740992) // 9007199254740992
console.log(9007199254740993) // 9007199254740992
console.log(9007199254740994) // 9007199254740994
console.log(9007199254740995) // 9007199254740996
console.log(9007199254740996) // 9007199254740996

0.1 + 0.2
// 0.30000000000000004
0.1 + 0.2 === 0.3 // false

Math.pow(2, 53) === 9007199254740992
-Math.pow(2, 53) === -9007199254740992

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1 === 9007199254740991
// true
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -(Math.pow(2, 53) - 1) ===-9007199254740991
// true

Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false
Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003
上面代码中，9007199254740993不是一个安全整数，但是Number.isSafeInteger会返回结果，显示计算结果是安全的。这是因为，这个数超出了精度范围，导致在计算机内部，以9007199254740992的形式储存。
9007199254740993 === 9007199254740992
// true

0 === -0 // false
NaN === NaN;        // false
Number.NaN === NaN; // false
isNaN(NaN);         // true
isNaN(Number.NaN);  // true



9.BigInt 数据类型  (大整数) 这是 ECMAScript 的第八种数据类型。

BigInt 是一种内置对象，它提供了一种方法来表示大于 253 - 1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。

BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。

// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true
// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity

console.log(12345678901234567890123456789012345678901234567890) // 1.2345678901234567e+49
console.log(12345678901234567890123456789012345678901234567890n) // 12345678901234567890123456789012345678901234567890n
console.log(12345678901234567890123456789012345678901234567890.1234567890123456789012345678901234567890123456789012345678901234567890) // 1.2345678901234567e+49

BigInt 同样可以使用各种进制表示，都要加上后缀n。
0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制

BigInt 与普通整数是两种值，它们之间并不相等。
42n === 42 // false
console.log('123' === \`123\`) // true

typeof运算符对于 BigInt 类型的数据返回bigint。
typeof 123n // 'bigint'

BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。
asm.js 是一个语法兼容 JavaScript 的……汇编。

-42n // 正确
42n // 正确
+42n // 报错

console.log(-1234567890123456789012345678901234567890123456789012345678901234567890n) // -1234567890123456789012345678901234567890123456789012345678901234567890n
console.log(1234567890123456789012345678901234567890123456789012345678901234567890n) // 1234567890123456789012345678901234567890123456789012345678901234567890n
console.log(+1234567890123456789012345678901234567890123456789012345678901234567890n) // TypeError: Cannot convert a BigInt value to a number


JavaScript 以前不能计算70的阶乘（即70!），因为超出了可以表示的精度。
let p = 1;
for (let i = 1; i <= 70; i++) {
  p *= i;
}
console.log(p); // 1.197857166996989e+100
现在支持大整数了，就可以算了，浏览器的开发者工具运行下面代码，就OK。
let p = 1n;
for (let i = 1n; i <= 70n; i++) {
  p *= i;
}
console.log(p); // 11978571...00000000n

console.log(window.BigInt(1) ) // 1n
console.log(new window.BigInt(1)) // BigInt is not a constructor
console.log(new BigInt(1) ) // 'BigInt' is not defined --eslint

// Number.parseInt() 与 BigInt.parseInt() 的对比
Number.parseInt('9007199254740993', 10)
// 9007199254740992
BigInt.parseInt('9007199254740993', 10)
// 9007199254740993n

Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"
!0n // true
!1n // false


                    `}
                </code>
            </pre>
        )
    }
    render() {

        // console.log(new BigInt(1) ) // 'BigInt' is not defined --esling
        console.log(123456789n.toString(2))
        console.log(123456789n.valueOf())
       
        return (
            <div>
                {this.renderTitle()}
                {this.renderDemo()}
            </div>
        );
    }
}