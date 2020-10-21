import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>字符串新增方法</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`

\0	                    空字符
\'	                    单引号
\"	                    双引号
\\	                    反斜杠
\n	                    换行
\r	                    回车
\v	                    垂直制表符
\t	                    水平制表符
\b	                    退格
\f	                    换页
\uXXXX	                unicode 码
\u{X} ... \u{XXXXXX}	    unicode codepoint 
\xXX	                    Latin-1 字符(x小写)

code point -> 码点； Unicode 编码点

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。
字符串由 字符组成，字符 由 两个字节的 UTF-16组成，

1.String.fromCodePoint()
String对象，该 属性和方法 为 静态的
String的实例对象
和其他语言不同，javascript 的字符串不区分单引号和双引号，所以不论是单引号还是双引号的字符串，转义字符都能运行 。

2.String.raw()

任何类型的转义形式都会失效

String.raw() 是一个模板字符串的标签函数，它的作用类似于 Python 中的字符串前缀 r 和 C# 中的字符串前缀 @（还是有点区别的，详见隔壁 Chromium 那边的这个 issue），
是用来获取一个模板字符串的原始字符串的，比如说，占位符（例如 $变量名）会被处理为它所代表的其他字符串，而转义字符（例如 \n）不会。

在大多数情况下, String.raw()是用来处理模版字符串的. 不要被上面复杂的参数要求吓到，因为像所有的 tag functions一样，
你通常不需要把它看成一个普通函数，你只需要把它放在模板字符串前面就可以了，而不是在它后面加个括号和一堆参数来调用它，引擎会替你去调用它。
String.raw() 是唯一一个内置的模板字符串标签函数，因为它太常用了。不过它并没有什么特殊能力，你自己也可以实现一个和它功能一模一样的标签函数。


JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。


3.实例方法： codePointAt()
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
上面代码中，汉字“𠮷”（注意，这个字不是“吉祥”的“吉”）的码点是0x20BB7，UTF-16 编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存。对于这种4个字节的字符，JavaScript 不能正确处理，字符串长度会误判为2，而且charAt()方法无法读取整个字符，charCodeAt()方法只能分别返回前两个字节和后两个字节的值。

ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。

let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97
codePointAt()方法的参数，是字符在字符串中的位置（从 0 开始）。
上面代码中，JavaScript 将“𠮷a”视为三个字符，codePointAt 方法在第一个字符上，正确地识别了“𠮷”，返回了它的十进制码点 134071（即十六进制的20BB7）。
在第二个字符（即“𠮷”的后两个字节）和第三个字符“a”上，codePointAt()方法的结果与charCodeAt()方法相同。

总之，codePointAt()方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt()方法相同。

codePointAt()方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString()方法转换一下。

let s = '𠮷a';

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"
你可能注意到了，codePointAt()方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是 1，但是必须向codePointAt()方法传入 2。
解决这个问题的一个办法是使用for...of循环，因为它会正确识别 32 位的 UTF-16 字符。

let s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
另一种方法也可以，使用扩展运算符（...）进行展开运算。

let arr = [...'𠮷a']; // arr.length === 2
arr.forEach(
  ch => console.log(ch.codePointAt(0).toString(16))
);
// 20bb7
// 61
codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false

5.实例方法：includes(), startsWith(), endsWith()
传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
这三个方法都支持第二个参数，表示开始搜索的位置。

let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

6. 实例方法：repeat()
repeat方法返回一个新字符串，表示将原字符串重复n次。

'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
参数如果是小数，会被取整。

'na'.repeat(2.9) // "nana"
如果repeat的参数是负数或者Infinity，会报错。

'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError
但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。

'na'.repeat(-0.9) // ""
参数NaN等同于 0。

'na'.repeat(NaN) // ""
如果repeat的参数是字符串，则会先转换成数字。

'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"


7.实例方法：padStart()，padEnd()
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
上面代码中，padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。

'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'
如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

'abc'.padStart(10, '0123456789')
// '0123456abc'
如果省略第二个参数，默认使用空格补全长度。

'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '
padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。

'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
另一个用途是提示字符串格式。

'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

8.实例方法：trimStart()，trimEnd()
ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。

const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
上面代码中，trimStart()只消除头部的空格，保留尾部的空格。trimEnd()也是类似行为。

除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。

浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。



es5原有 属性 和 方法

1.String.prototype.concat()
性能： 强烈建议使用 赋值操作符（+, +=）代替 concat 方法。


string.slice(start, end)提取一个字符串
string.substring(start, end)提取一个字符串,end不支持负数
string.substr(start, len)提取一个长度为len的字符串

参数不一样，起始位置 末尾位置不一样 含与不含 返回类型一样， 不改变原数组


                    `}
                </code>
            </pre>
        )
    }
   
    render() {
   
// \0	                    空字符
// \'	                    单引号
// \"	                    双引号
// \\	                    反斜杠
// \n	                    换行
// \r	                    回车
// \v	                    垂直制表符
// \t	                    水平制表符
// \b	                    退格
// \f	                    换页
// \uXXXX	                unicode 码
// \u{X} ... \u{XXXXXX}	    unicode codepoint 
// \xXX	                    Latin-1 字符(x小写)

// String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

// String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

// String.raw`Hi\\n`
// 返回 "Hi\\\\n"

// String.raw`Hi\\n` === "Hi\\\\n" // true

// String.raw`Hi\n${2+3}!` === `${String.raw`Hi\n${2+3}!`}`

// `foo${1 + 2}bar`
// 等同于
// String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"

// 作为函数，String.raw()的代码实现基本如下。
// String.raw = function (strings, ...values) {
//   let output = '';
//   let index;
//   for (index = 0; index < values.length; index++) {
//     output += strings.raw[index] + values[index];
//   }
//   output += strings.raw[index]
//   return output;
// }


// console.log(String.raw({ raw: { a: 'A', b: 'B'} }, 1 + 2)) // 空串
// console.log(String.raw({ raw: { a: 'A', b: 'B'} }, 3, 4)) // 空串
// console.log(String.raw({ raw: 'AB' }, 1 + 2)) // A3B

// console.log(String.raw({ raw: ['foo', 'bar'] }, 1 + 2)) // foo3bar
// console.log(String.raw({ raw: [`${true}`, 'bar'] }, 1 + 2)) // true3bar
// console.log(String.raw({ raw: [String.raw({ raw: ['a', 'b']}, 'A', 'B'), 'bar'] }, 1 + 2)) // aAb3bar

// String.raw`Hi\n${2+3}!`;
// 'Hi\n5!'，Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符

// String.raw `Hi\u000A!`;             
// "Hi\u000A!"，同上，这里得到的会是 \、u、0、0、0、A 6个字符，
// 任何类型的转义形式都会失效，保留原样输出，不信你试试.length

// let name = "Bob";
// String.raw `Hi\n${name}!`;             
// "Hi\nBob!"，内插表达式还可以正常运行


// 正常情况下，你也许不需要将 String.raw() 当作函数调用。
// 但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
// String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
// 注意这个测试, 传入一个 string, 和一个类似数组的对象
// 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
// String.raw({
//   raw: ['foo', 'bar', 'baz'] 
// }, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'


// console.log('𠮷'.charCodeAt())
// console.log(String.fromCodePoint(0x20BB7)) // 𠮷
// console.log(String.fromCodePoint(134071)) // 𠮷


// 进制转换 -> toString() radix argument must be between 2 and 36；  二进制 ~ 三十二进制
// console.log((123456).toString(2)) // 11110001001000000
// console.log((123456).toString(4)) // 132021000
// console.log((123456).toString(8)) // 361100
// console.log((123456).toString(10)) // 123456
// console.log((123456).toString(16)) // 1e240
// console.log((123456).toString(32)) // 3oi0


const a = '123;333'
console.log(a.split(';'))
console.log(a)

        return (
            <div>
                {this.renderTitle()}
                {this.renderDemo()}
            </div>
        );
    }
}