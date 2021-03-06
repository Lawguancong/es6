import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>Proxy</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`

1.概述 Proxy 代理
ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
var proxy = new Proxy(target, handler);
Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。


var obj = new Proxy({}, {
    get: function (target, propKey, receiver) {
      console.log('getting $propKey!');
      return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
      console.log('setting $propKey!');
      return Reflect.set(target, propKey, value, receiver);
    }
});

handler 为空{}
var target = {};
var proxy = new Proxy(target, {});
target.a = 'bbb';
// proxy.a = 'bbb'; 结果一样
console.log(target) // { a: 'bbb' }
console.log(target.a) // bbb
console.log(target.b) // undefined
console.log(proxy) // Proxy { a: 'bbb' }
console.log(proxy.a) // bbb
console.log(proxy.b) // undefined

handler 不为空{}
var target = {};
var proxy = new Proxy(target, { get: function(target, propKey) { return 35 } });
// var proxy = new Proxy(target, { get: (target, propKey) => 35 }); // 结果一样
target.a = 'bbb';
// proxy.a = 'bbb'; // 结果一样
console.log(target) // { a: 'bbb' }
console.log(target.a) // bbb
console.log(target.b) // undefined
console.log(proxy) // Proxy { a: 'bbb' }
console.log(proxy.a) // 35
console.log(proxy.b) // 35

注意，要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。
如果handler没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target, handler); // handler = {} -> 实例对象proxy -> 原对象target
proxy.a = 'b';
target.a // 'b'

一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
var object = { proxy: new Proxy(target, handler) };
// object.proxy

Proxy 实例也可以作为其他对象的原型对象。
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});
const obj = Object.create(proxy);
obj.time // 35
上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。


const target = { key1: 'key1' };
const proxy = new Proxy(target, { get: () => 1 });
target.a = 'a'
proxy.c = 'c'
let __protype__proxy = {};
// __protype__proxy = new Proxy(proxy, {});
// __protype__proxy = new Proxy(proxy, { get: () => 2 });

// __protype__proxy = Object.create(proxy);
__protype__proxy = Object.assign({}, Object.create(proxy));

// __protype__proxy = Object.create(proxy, Object.getPrototypeOf(proxy))
// __protype__proxy = Object.assign({}, Object.create(proxy, Object.getPrototypeOf(proxy)));

// __protype__proxy = Object.create(proxy, Object.getOwnPropertyDescriptors(proxy))
// __protype__proxy = Object.assign({}, Object.create(proxy, Object.getOwnPropertyDescriptors(proxy)));

// __protype__proxy = Object.create(proxy, Object.getPrototypeOf(proxy), Object.getOwnPropertyDescriptors(proxy))
// __protype__proxy = Object.assign({}, Object.create(Object.getPrototypeOf(proxy)), proxy);
// __protype__proxy = Object.create(Object.getPrototypeOf(proxy), Object.getOwnPropertyDescriptors(proxy))
target.b = 'b'
proxy.d = 'd'
console.log(target)
console.log(target.a)
console.log(target.time)
console.log(proxy)
console.log(proxy.a)
console.log(proxy.time)
console.log(__protype__proxy)
console.log(__protype__proxy.a)
console.log(__protype__proxy.time)





Proxy 支持的拦截操作一览，一共 13 种。
 (1)construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
 (2)apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

 (3)get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
 (4)set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
 (5)has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

 (6)defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
 (7)deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
 (8)getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
 (9)ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  
(10)getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
(11)setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

(12)isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
(13)preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。





用法:

(1)construct(target, args) 
onstruct()方法用于拦截new命令，下面是拦截对象的写法。
const handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};
construct()方法可以接受三个参数。
target：目标对象。(是个函数)
args：构造函数的参数数组。
newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）。
const p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});
(new p(1)).value
// "called: 1"
// 10

construct()方法返回的必须是一个对象，否则会报错。
const p = new Proxy(function() {}, {
  construct: function(target, argumentsList) {
    return 1;
  }
});
new p() // 报错
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')

另外，由于construct()拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。
const p = new Proxy({}, {
  construct: function(target, argumentsList) {
    return {};
  }
});
new p() // 报错
// Uncaught TypeError: p is not a constructor
上面例子中，拦截的目标对象不是一个函数，而是一个对象（new Proxy()的第一个参数），导致报错。

注意，construct()方法中的this指向的是handler，而不是实例对象。
const handler = {
    construct: (target, args) => {
        console.log(this === handler); // fasle 
        return new target(...args);
    }
}
let p = new Proxy(function () {}, handler);
new p()

const handler = {
    construct: function(target, args) {
      console.log(this === handler); // true
      return new target(...args);
    }
}
let p = new Proxy(function () {}, handler);
new p()




(2)apply(target, object, args)
apply方法拦截函数(fn), 如 fn()、fn.call()、fn.apply() fn.bind() Reflect.apply() 操作。
apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

var handler = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments);
  }
};
下面是一个例子。
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};
var p = new Proxy(target, handler);
p()
// "I am the proxy"
上面代码中，变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。


下面是另外一个例子。
var twice = {
    apply (target, ctx, args) {
        console.log(arguments) // arguments 数据结构不一样
        return Reflect.apply(...arguments) * 2;
        // return arguments[0](...arguments[2]) * 2;
    }
};
function sum (left, right) { 
  console.log(arguments) // arguments 数据结构不一样
  return left + right;
};
var proxy = new Proxy(sum, twice);
console.log(proxy(1, 2)) // 6
console.log(proxy.call(null, 5, 6)) // 22
console.log(proxy.apply(null, [7, 8])) // 30
console.log(Reflect.apply(proxy, null, [9, 10])) // 38
上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
另外，直接调用Reflect.apply方法，也会被拦截。
Reflect.apply(proxy, null, [9, 10]) // 38

Reflect.apply(...arguments) => Reflect.apply(proxy, null, [9, 10]) => arguments[0](...arguments[2])
arguments => arguments[0] = proxy, arguments[1] = null, arguments[3] = [9, 10]
arguments[0] => proxy => 函数
arguments[2] => [9, 10] => 参数


(3)get(target, propKey, receiver)
get方法可以继承。
var person = {
  name: "张三"
};
var proxy = new Proxy(person, {
  get: function(target, propKey) {
    if (propKey in target) {
      return target[propKey];
    } else {
      throw new ReferenceError("Prop name \"" + propKey + "\" does not exist."); // 直接页面报错炸裂
    }
  }
});
proxy.name // "张三"
proxy.age // 抛出一个错误
上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。

get方法可以继承。
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});
let obj = Object.create(proto);
obj.foo // "GET foo"

下面的例子使用get拦截，实现数组读取负数的索引。
function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey);
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    }
  };
  let target = [];
  target.push(...elements);
  return new Proxy(target, handler);
}
let arr = createArray('a', 'b', 'c');
arr[-1] // c
上面代码中，数组的位置参数是-1，就会输出数组的倒数第一个成员。


下面是一个get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。
const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});
proxy.getReceiver === proxy // true
上面代码中，proxy对象的getReceiver属性是由proxy对象提供的，所以receiver指向proxy对象。

const proxy = new Proxy({}, {
  get: function(target, key, receiver) {
    return receiver;
  }
});
const d = Object.create(proxy);
d.a === d // true
上面代码中，d对象本身没有a属性，所以读取d.a的时候，会去d的原型proxy对象找。这时，receiver就指向d，代表原始的读操作所在的那个对象。

如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});
const handler = {
  get(target, propKey) {
    return 'abc';
  }
};
const proxy = new Proxy(target, handler);
proxy.foo
// TypeError: Invariant check failed



(4)set(target, propKey, value, receiver)
set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，那么可以使用Proxy保证age的属性值符合要求。
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于满足条件的 age 属性以及其他属性，直接保存
    obj[prop] = value;
  }
};
let person = new Proxy({}, validator);
person.age = 100;
person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
上面代码中，由于设置了存值函数set，任何不符合要求的age属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。

有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。
const handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(Invalid attempt to $action private "$key" property);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'
// Error: Invalid attempt to set private "_prop" property
上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。

下面是set方法第四个参数的例子。
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
proxy.foo === proxy // true
上面代码中，set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，一般情况下是proxy实例本身，请看下面的例子。
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
  }
};
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);

myObj.foo = 'bar';
myObj.foo === myObj // true
上面代码中，设置myObj.foo属性的值时，myObj并没有foo属性，因此引擎会到myObj的原型链去找foo属性。myObj的原型对象proxy是一个 Proxy 实例，设置它的foo属性会触发set方法。这时，第四个参数receiver就指向原始赋值行为所在的对象myObj。

注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
});
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
};
const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
上面代码中，obj.foo属性不可写，Proxy 对这个属性的set代理将不会生效。

注意，严格模式下，set代理如果没有返回true，就会报错。
'use strict';
const handler = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver;
    // 无论有没有下面这一行，都会报错
    return false;
  }
};
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
上面代码中，严格模式下，set代理返回false或者undefined，都会报错。


(5)has(target, propKey)
has()方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
has()方法可以接受两个参数，分别是目标对象、需查询的属性名。
下面的例子使用has()方法隐藏某些属性，不被in运算符发现。
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
上面代码中，如果原对象的属性名的第一个字符是下划线，proxy.has()就会返回false，从而不会被in运算符发现。

如果原对象不可配置或者禁止扩展，这时has()拦截会报错。
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});
'a' in p // TypeError is thrown
上面代码中，obj对象禁止扩展，结果使用has拦截就会报错。也就是说，如果某个属性不可配置（或者目标对象不可扩展），则has()方法就不得“隐藏”（即返回false）目标对象的该属性。

值得注意的是，has()方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has()方法不判断一个属性是对象自身的属性，还是继承的属性。
另外，虽然for...in循环也用到了in运算符，但是has()拦截对for...in循环不生效。
let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};
let handler = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log($target.name 不及格);
      return false;
    }
    return prop in target;
  }
}
let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);
'score' in oproxy1
// 张三 不及格
// false
'score' in oproxy2
// true
for (let a in oproxy1) {
  console.log(oproxy1[a]);
}
// 张三
// 59
for (let b in oproxy2) {
  console.log(oproxy2[b]);
}
// 李四
// 99
上面代码中，has()拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被for...in循环所排除。



(6)defineProperty(target, propKey, propDesc)

defineProperty()方法拦截了Object.defineProperty()操作。
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
上面代码中，defineProperty()方法内部没有任何操作，只返回false，导致添加新属性总是无效。注意，这里的false只是用来提示操作失败，本身并不能阻止添加新属性。
注意，如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。


(7)deleteProperty(target, propKey)

deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
var handler = {
  deleteProperty (target, key) {
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(Invalid attempt to $action private "$key" property);
  }
}
var target = { _prop: 'foo' };
var proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。
注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。



(8)getOwnPropertyDescriptor(target, propKey)

getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
var handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
};
var target = { _foo: 'bar', baz: 'tar' };
var proxy = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
上面代码中，handler.getOwnPropertyDescriptor()方法对于第一个字符为下划线的属性名会返回undefined。



(9)ownKeys(target)

ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
  Object.getOwnPropertyNames()
  Object.getOwnPropertySymbols()
  Object.keys()
  for...in循环


  下面是拦截Object.keys()的例子。

let target = {
  a: 1,
  b: 2,
  c: 3
};

let handler = {
  ownKeys(target) {
    return ['a'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// [ 'a' ]
上面代码拦截了对于target对象的Object.keys()操作，只返回a、b、c三个属性之中的a属性。

下面的例子是拦截第一个字符为下划线的属性名。

let target = {
  _bar: 'foo',
  _prop: 'bar',
  prop: 'baz'
};

let handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
};

let proxy = new Proxy(target, handler);
for (let key of Object.keys(proxy)) {
  console.log(target[key]);
}
// "baz"
注意，使用Object.keys()方法时，有三类属性会被ownKeys()方法自动过滤，不会返回。

目标对象上不存在的属性
属性名为 Symbol 值
不可遍历（enumerable）的属性
let target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};

Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
});

let handler = {
  ownKeys(target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
};

let proxy = new Proxy(target, handler);

Object.keys(proxy)
// ['a']
上面代码中，ownKeys()方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、不可遍历的属性（key），结果都被自动过滤掉。

ownKeys()方法还可以拦截Object.getOwnPropertyNames()。

var p = new Proxy({}, {
  ownKeys: function(target) {
    return ['a', 'b', 'c'];
  }
});

Object.getOwnPropertyNames(p)
// [ 'a', 'b', 'c' ]
for...in循环也受到ownKeys()方法的拦截。

const obj = { hello: 'world' };
const proxy = new Proxy(obj, {
  ownKeys: function () {
    return ['a', 'b'];
  }
});

for (let key in proxy) {
  console.log(key); // 没有任何输出
}
上面代码中，ownkeys()指定只返回a和b属性，由于obj没有这两个属性，因此for...in循环不会有任何输出。

ownKeys()方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。

var obj = {};

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return [123, true, undefined, null, {}, []];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 123 is not a valid property name
上面代码中，ownKeys()方法虽然返回一个数组，但是每一个数组成员都不是字符串或 Symbol 值，因此就报错了。

如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys()方法返回，否则报错。

var obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10 }
);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
上面代码中，obj对象的a属性是不可配置的，这时ownKeys()方法返回的数组之中，必须包含a，否则会报错。

另外，如果目标对象是不可扩展的（non-extensible），这时ownKeys()方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。

var obj = {
  a: 1
};

Object.preventExtensions(obj);

var p = new Proxy(obj, {
  ownKeys: function(target) {
    return ['a', 'b'];
  }
});

Object.getOwnPropertyNames(p)
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
上面代码中，obj对象是不可扩展的，这时ownKeys()方法返回的数组之中，包含了obj对象的多余属性b，所以导致了报错。


(10)getPrototypeOf(target)
getPrototypeOf()方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
Object.prototype.__proto__
Object.prototype.isPrototypeOf()
Object.getPrototypeOf()
Reflect.getPrototypeOf()
instanceof
下面是一个例子。
var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true
上面代码中，getPrototypeOf()方法拦截Object.getPrototypeOf()，返回proto对象。
注意，getPrototypeOf()方法的返回值必须是对象或者null，否则报错。另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf()方法必须返回目标对象的原型对象。


(11)setPrototypeOf(target, proto)

setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。

下面是一个例子。
var handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
};
var proto = {};
var target = function () {};
var proxy = new Proxy(target, handler);
Object.setPrototypeOf(proxy, proto);
// Error: Changing the prototype is forbidden
上面代码中，只要修改target的原型对象，就会报错。
注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。



(12)isExtensible(target)

isExtensible()方法拦截Object.isExtensible()操作。

var p = new Proxy({}, {
  isExtensible: function(target) {
    console.log("called");
    return true;
  }
});

Object.isExtensible(p)
// "called"
// true
上面代码设置了isExtensible()方法，在调用Object.isExtensible时会输出called。
注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。
这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。
Object.isExtensible(proxy) === Object.isExtensible(target)
下面是一个例子。
var p = new Proxy({}, {
  isExtensible: function(target) {
    return false;
  }
});
Object.isExtensible(p)
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not reflect extensibility of proxy target (which is 'true')



(13)preventExtensions(target)
preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。

这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。

var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    return true;
  }
});

Object.preventExtensions(proxy)
// Uncaught TypeError: 'preventExtensions' on proxy: trap returned truish but the proxy target is extensible
上面代码中，proxy.preventExtensions()方法返回true，但这时Object.isExtensible(proxy)会返回true，因此报错。

为了防止出现这个问题，通常要在proxy.preventExtensions()方法里面，调用一次Object.preventExtensions()。

var proxy = new Proxy({}, {
  preventExtensions: function(target) {
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
});

Object.preventExtensions(proxy)
// "called"
// Proxy {}
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