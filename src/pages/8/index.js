import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>this apply call bind用法</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`

1.this的指向
和是否是 严格模式有关 use strict
在 ES5 中，this 的指向，始终坚持一个原理：this 永远指向最后调用它的那个对象，来，跟着我朗读三遍：this 永远指向最后调用它的那个对象，this 永远指向最后调用它的那个对象，this 永远指向最后调用它的那个对象。
函数挂载在哪个对象上， this指向哪。 

es6中 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。(声明定义时的this）

用严格模式下 -> this 的指向 不一样 undefined or null

var name = "windowsName";
var a = {
    name : null,
    // name: "Cherry",
    fn : function () {
        console.log(this.name);      // windowsName
    }
}
var f = a.fn;
// 由于刚刚的 f 并没有调用，所以 fn() 最后仍然是被 window 调用的。所以 this 指向的也就是 window。


非 use strict下

var name = "111"; // window.name = '111'
var a = {
    name : '222',
    fn : {
        name: '333',
        func: function () {
            console.log(this.name);
        }
    }
}
var f = a.fn.func; // window.f
f(); // window.f() -> 111
a.fn.func() // 333

var name = "111"; // window.name = '111'
var a = {
    name : '222',
    fn :  {
        name: '333',
        func : () => {
            console.log(this.name);
        }
    }
}
var f = a.fn.func; // window.f
f(); // window.f() -> 111
a.fn.func() // 111

var name = "111"; // window.name = '111'
var a = {
    name : '222',
    fn : {
        name: '333',
        func: function () {
            this.name = '444'
            console.log(this.name);
        }
    }
}
var f = a.fn.func; // window.f
f(); // window.f() -> 111
a.fn.func() // 333

var name = "111"; // window.name = '111'
var a = {
    name : '222',
    fn :  {
        name: '333',
        func : () => {
            this.name = '444'
            console.log(this.name);
        }
    }
}
var f = a.fn.func; // window.f
f(); // window.f() -> 444
a.fn.func() // 444




2.怎么改变 this 的指向
ES6 的箭头函数 （箭头函数的 this 始终指向函数定义时的 this，而非执行时。）
_this = this
使用 apply、call、bind
new 实例化一个对象


var name = "windowsName";
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout(  function () {
            this.func1()
        },100);
    }
};
a.func2()     // this.func1 is not a function


var name = "windowsName";
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        setTimeout(  () => {
            this.func1()
        },100);
    }
};
a.func2()     // Cherry


var name = "windowsName";
var a = {
    name : "Cherry",
    func1: function () {
        console.log(this.name)     
    },
    func2: function () {
        this.func1 = function() {
          console.log('11111')
        }
        setTimeout(() => {
            this.func1()
        },100);
    }
};
a.func2()     // 11111


使用 apply
var a = {
    name : "Cherry",

    func1: function () {
        console.log(this.name)
    },

    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.apply(a),100);
    }

};
a.func2()            // Cherry复制代码使用 call

使用 call
var a = {
    name : "Cherry",

    func1: function () {
        console.log(this.name)
    },

    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.call(a),100);
    }

};
a.func2()            // Cherry复制代码使用 bind

使用 bind
var a = {
    name : "Cherry",

    func1: function () {
        console.log(this.name)
    },

    func2: function () {
        setTimeout(  function () {
            this.func1()
        }.bind(a)(),100);
    }

};
a.func2()            // Cherry


apply

apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数

fun.apply(thisArg, [argsArray])

thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，
如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。

argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。浏览器兼容性请参阅本文底部内容。



call
fun.call(thisArg[, arg1[, arg2[, ...]]])
apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。
var a ={
    name : "Cherry",
    fn : function (a,b) {
        console.log( a + b)
    }
}
var b = a.fn;
b.apply(a,[1,2])     // 3


var a ={
    name : "Cherry",
    fn : function (a,b) {
        console.log( a + b)
    }
}
var b = a.fn;
b.call(a,1,2)       // 3



bind
bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
bind 是创建一个新的函数，我们必须要手动去调用：
var a ={
    name : "Cherry",
    fn : function (a,b) {
        console.log( a + b)
    }
}
var b = a.fn;
b.bind(a,1,2)()           // 3





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