import React from 'react';



export default class Comp extends React.PureComponent {

    renderTitle = () =>{
        return <h1>let 和 const</h1>
    }

    renderDemo = () => {


        return (
            <pre>
                <code>
                    {`

ES5 声明变量的方法: var function

ES6 声明变量的方法: let const import class


1. let 命令
let命令所在的代码块内有效(不再推荐使用var)
局部变量
不会污染
不会越界


{
    let a = 10;
    var b = 1;
}
a // ReferenceError: a is not defined.
b // 1


for (let i = 0; i < 10; i++) {
    // ...
}
console.log(i);
// ReferenceError: i is not defined


var a = [];
for (var i = 0; i < 10; i++) {  
->  for (var i = 0; i < 10 && i++; ) 语法不可以
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 10; 越界； i=9时， i++, i=10, i !< 10, 所以最后 i=10
原因：var 是全局变量，所有i指向全局的i

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 6
上面代码中，变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，
所以最后输出的是6。你可能会问，如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，
从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，
就在上一轮循环的基础上进行计算。


另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
for (let i = 0; i < 3; i++) {
let i = 'abc';
console.log(i);
}
// abc
// abc
// abc
上面代码正确运行，输出了 3 次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。

{
    let i = 1;
    console.log(i) // 1
    {  
        let i = 2
        console.log(i) // 2
    }
}
{
    let i = 3;
    console.log(i) // 3
    {
        let i = 4;
        console.log(i) // 4
    }
}


不存在变量提升
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;


暂时性死区 
减少运行时错误
总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。
这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
var tmp = 123;
if (true) {
    tmp = 'abc'; // ReferenceError
    let tmp;
}
if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

typeof x; // ReferenceError
let x;
在没有let之前，typeof运算符是百分之百安全的，永远不会报错。

function bar(x = y, y = 2) {
    return [x, y];
}
bar(); // 报错

function bar(x = 2, y = x) {
return [x, y];
}
bar(); // [2, 2]

// 不报错
var x = x;
// 报错
let x = x;
// ReferenceError: x is not defined

上面代码报错，也是因为暂时性死区。使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。
上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。
ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，
从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。
总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，
但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。



不允许重复声明 
let不允许在相同作用域内，重复声明同一个变量。

// 报错
function func() {
    let a = 10;
    var a = 1;
}
// 报错
function func() {
    let a = 10;
    let a = 1;
}
因此，不能在函数内部重新声明参数。
function func(arg) {

}
func() // 报错
function func(arg) {
    {
        let arg;
    }
}
func() // 不报错

循环函数则不然。

ES5 只有 全局作用域 和 函数作用域 没有块级作用域

第一种场景，内层变量可能会覆盖外层变量。

var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}

f(); // undefined
上面代码的原意是，if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量。但是，函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

第二种场景，用来计数的循环变量泄露为全局变量。

var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
上面代码中，变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。


let n = 5;
if (true) {
    let n = 10;
}
console.log(n); // 5

var n = 5;
if (true) {
    var n = 10;
}
console.log(n); // 10

{{{{
  let insane = 'Hello World';
  {let insane = 'Hello World'}
}}}};

块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}


const声明的常量，也与let一样不可重复声明。

var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;


本质
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，
const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

下面是另一个例子。

const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
上面代码中，常量a是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给a，就会报错。

如果真的想将对象冻结，应该使用Object.freeze方法。

const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
上面代码中，常量foo指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。

var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};


顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。



window.a = 1;
a // 需要 window.a -> 1

a = 2;
window.a //  需要 window.a -> 2

上面代码中，顶层对象的属性赋值与全局变量的赋值，是同一件事。

顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，
只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；
其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，
这非常不利于模块化编程。另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，
依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，
不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined


globalThis 对象
JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
Node 里面，顶层对象是global，但其他环境都不支持。
同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。

全局环境中，this会返回顶层对象。但是，Node.js 模块中this返回的是当前模块，ES6 模块中this返回的是undefined。
函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），
那么eval、new Function这些方法都可能无法使用。
综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。

// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。

垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis。



                    `}
                </code>
            </pre>
        )
    }
   
    render() {

        return (
            <div>
                {this.renderTitle()}
                {this.renderDemo()}
            </div>
        );
    }
}