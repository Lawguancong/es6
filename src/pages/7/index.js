import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>函数的扩展</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`
1.函数参数的默认值

// 普通函数有内部this的指向，所以可以 new 有 constructor ，可构造
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}
const p = new Point();
p // Point {x: 0, y: 0}


function Point() {
    this.x = 'xxx';
    return 'string'
}
console.log(Point()) // string
console.log(new Point()) // Point { x: 'xxx' }
console.log(new Point().x) // 'xxx'

参数变量是默认声明的，所以不能用let或const再次声明。
TBZ Temporal Blocked Zoom 暂时性锁区
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
foo() // 100
x = 100;
foo() // 101


函数参数的作用域
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2) // 2

let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // 1

function f(y = x) {
  let x = 2;
  console.log(y);
}
f() // ReferenceError: x is not defined


var x = 1;
function foo(x = x) {
  // ...
}
foo() // ReferenceError: x is not defined
上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。


let foo = 'outer';
function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar(); // outer

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}
bar() // ReferenceError: foo is not defined

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}
foo() // 3
x // 1


var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}
foo() // 2
x // 1


2.rest 参数 -> 是一个数组

ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
// 报错
function f(a, ...b, c) {
  // ...
}
function add(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3) // 10

下面是一个 rest 参数代替arguments变量的例子。
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}
// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
上面代码的两种写法，比较后可以发现，rest 参数的写法更自然也更简洁。
arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。
rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。

var f = function () {};
// ES5
f.name // ""
// ES6
f.name // "f"


3.严格模式
ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。



箭头函数

由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
箭头函数有几个使用注意点。
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。


如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
let fn = () => void doesNotReturn();
fn = () => void {}; // console.log(fn()) undefined


function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}
var id = 21;
console.log(foo.call({ id: 42 })) // id: 42
// console.log(foo({ id: 42 })) // TypeError: Cannot read property 'id' of undefined
上面代码中，setTimeout()的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。
如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以打印出来的是42。

普通函数 可以构造，可以 new 实例化。


const Func = () => {
    this.x = 'xxxx';
    this.b = 'bbbb';
    return '123'
}
// console.log(new Func()) // Func is not a constructor
// console.log(Func()) // 123

function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function () {
      this.s2++;
    }, 1000);
}
var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0

this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
所以，箭头函数转成 ES5 的代码如下。
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
// ES5
function foo() {
  var _this = this;
  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
上面代码中，转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。

function foo() {
    return () => {
      return () => {
        return () => {
          console.log('id:', this.id);
        };
      };
    };
}
var f = foo.call({id: 1});
var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4}); // id: 1
上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。

柯里化
const foo1 = (a) =>{
    console.log(a)
    return (b) => {
        console.log(b)
        return (c) => {
            console.log(c)
            return (d) => {
                console.log(d)
            };
        };
    };
}
console.log(foo1(0)(1)(2)(3))
// 0
// 1
// 2
// 3

const foo2 = (a) => (b) => (c) => (d) => {
    console.log(a)
    console.log(b)
    console.log(c)
    console.log(d)
}
console.log(foo2('A')('B')('C')('D'))
// A
// B
// C
// D

function foo() {
    setTimeout(() => {
      console.log('args:', arguments);
    }, 100);
}
console.log(foo(2, 4, 6, 8))
// args: [2, 4, 6, 8]  -> args: Arguments(4) [2, 4, 6, 8, callee: (...), Symbol(Symbol.iterator): ƒ]

(function() {
  return [
    (() => this.x).bind({ x: 'inner' })()
  ];
}).call({ x: 'outer' });
// ['outer']
上面代码中，箭头函数没有自己的this，所以bind方法无效，内部的this指向外部的this。（apply call bind 都失效，没有this）

const aa =(function() {
    return [
      (() => this.x).call({ x: 'inner' })
    ];
}).call({ x: 'outer' });
console.log(aa) // 'outer'

(() => this.x).call({ x: 'inner' }) ->  (() => this.x).bind({ x: 'inner' })()


由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数。
第一个场合是定义对象的方法，且该方法内部包括this。
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；
如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。
第二个场合是需要动态this的时候，也不应使用箭头函数。
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。


嵌套的箭头函数

function insert(value) {
  return {into: function (array) {
    return {after: function (afterValue) {
      array.splice(array.indexOf(afterValue) + 1, 0, value);
      return array;
    }};
  }};
}
insert(2).into([1, 3]).after(1); //[1, 2, 3]
上面这个函数，可以使用箭头函数改写。
let insert = (value) => ({into: (array) => ({after: (afterValue) => {
  array.splice(array.indexOf(afterValue) + 1, 0, value);
  return array;
}})});
insert(2).into([1, 3]).after(1); //[1, 2, 3]




尾调用优化 
尾调用 （Tail Call）
ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
某个函数的最后一步是 return 调用另一个函数。
尾调用不一定出现在函数尾部，只要是最后一步操作即可。
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}


这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
尾调用之所以与其他调用不同，就在于它的特殊的调用位置。
我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。
如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。
如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。
尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。
注意，目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();
// 等同于
function f() {
  return g(3);
}
f();
// 等同于
g(3);
上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧，只保留g(3)的调用帧。

function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。




尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。

递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
factorial(5) // 120
上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。
如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1) // 120
还有一个比较著名的例子，就是计算 Fibonacci 数列，也能充分说明尾递归优化的重要性。

非尾递归的 Fibonacci 数列实现如下。

function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2); // 有 + 赋值操作
}
Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

尾递归优化过的 Fibonacci 数列实现如下。

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity

“尾调用优化”对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。ES6 亦是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署“尾调用优化”。
这就是说，ES6 中只要使用尾递归，就不会发生栈溢出（或者层层递归造成的超时），相对节省内存。


柯里化 currying 库里
多参数 -> 单参数
函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

function currying(fn, n) {
  return function (m) {
    return fn.call(this, m, n);
    // return fn(m, n);
  };
}
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
const factorial = currying(tailFactorial, 1);
factorial(5) // 120


这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
func.arguments：返回调用时函数的参数。
func.caller：返回调用当前函数的那个函数。
尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

function restricted() {
  'use strict';
  restricted.caller;    // 报错
  restricted.arguments; // 报错
}
restricted();

catch 命令的参数省略 (err省略)
JavaScript 语言的try...catch结构，以前明确要求catch命令后面必须跟参数，接受try代码块抛出的错误对象。
try {
  // ...
} catch (err) {
  // 处理错误
}
上面代码中，catch命令后面带有参数err。
很多时候，catch代码块可能用不到这个参数。但是，为了保证语法正确，还是必须写。ES2019 做出了改变，允许catch语句省略参数。
try {
  // ...
} catch {
  // ...
}

aa.call({ xxxx: '123'}) -> aa.bind({ xxxx: '123'})()

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