import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>对象的新增方法</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`

语法
// 对象初始化器（Object initialiser）或对象字面量（literal）
{ [ nameValuePair1[, nameValuePair2[, ...nameValuePairN] ] ] }

// 以构造函数形式来调用
new Object([value])


在JavaScript中，几乎所有的对象都是Object类型的实例，它们都会从Object.prototype继承属性和方法。
Object 构造函数为给定值创建一个对象包装器。Object构造函数，会根据给定的参数创建对象，具体有以下情况：

如果给定值是 null 或 undefined，将会创建并返回一个空对象
如果传进去的是一个基本类型的值，则会构造其包装类型的对象
如果传进去的是引用类型的值，仍然会返回这个值，经他们复制的变量保有和源对象相同的引用地址
当以非构造函数形式被调用时，Object 的行为等同于 new Object()。













































JavaScript Object的属性 Configurable,Enumerable,Writable,Value,Getter,Setter

configurable
configurable(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。
configurable -> false，value、writable、enumerable和configurable都不能被修改了。
注意，writable只有在false改为true会报错，true改为false是允许的。
至于value，只要writable和configurable有一个为true，就允许改动。
另外，configurable为false时，直接目标属性赋值，不报错，但不会成功。

writable属性
writable属性是一个布尔值，决定了目标属性的值（value）是否可以被改变。如果原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性。

enumerable
enumerable（可遍历性）返回一个布尔值，表示目标属性在 for..in、Object.keys、JSON.stringify 中是否可遍历。但是可以直接获取它的值。
注意，for...in循环包括继承的属性，Object.keys方法不包括继承的属性。如果需要获取对象自身的所有属性，不管是否可遍历，可以使用Object.getOwnPropertyNames方法。

1.Object.is()

JavaScript提供了3中比较运算符
==
===
Object.is()


Object.is() 方法判断两个值是否为同一个值。如果满足以下条件则两个值相等:
都是 undefined
都是 null
都是 true 或 false
都是相同长度的字符串且相同字符按相同顺序排列
都是相同对象（意味着每个对象有同一个引用）
都是数字且
都是 +0
都是 -0
都是 NaN
或都是非零而且非 NaN 且为同一个值
与== 运算不同。  == 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 "" == false 判断为 true), 而 Object.is不会强制转换两边的值。
与=== 运算也不相同。 === 运算符 (也包括 == 运算符) 将数字 -0 和 +0 视为相等 ，而将Number.NaN 与NaN视为不相等.

ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。
它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。
Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

console.log(1 == '1') // true
console.log(1 === '1') // false

console.log(+0 === -0) // true
console.log(0 === -0) // true
console.log(0 === +0) // true
console.log(0/0) // NaN
console.log(0/1) // 0
console.log(1/0) // Infinity

console.log(NaN === NaN) // false    ->    Not a Number === Not a Number // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
Object.is('foo', 'foo');     // true

操作值为对象且引用地址相同
Object.is(window, window);   // true
Object.is('foo', 'bar');     // false
Object.is([], []);           // false
var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);         // true
Object.is(foo, bar);         // false
Object.is(null, null);       // true
Object.is('foo', 'foo') // true

let a = {"name": "Arwa"}
let b = a
Object.is(a, b) // true
Object.is({"name": "Arwa"}, {"name": "Arwa"}) // false

console.log( {} == {}) // false
console.log( {} === {}) // false
console.log( { a: 1 } == { a: 1} ) // false
console.log( { a: 1 } === { a: 1} ) // false
console.log(( (() => {}) == (() => {}) )) // false
console.log(( (() => {}) === (() => {}) )) // false
console.log( (function a () {}) == (function a () {}) ) // false
console.log( (function a () {}) === (function a () {}) ) // false
console.log(Object.is({}, {})) // false
console.log(Object.is({ a: 1 }, { a: 1})) // false
console.log(Object.is( () => {}, () => {} )) // false
console.log(Object.is( function a () {}, function a () {} )) // false
console.log(Object.is(+0, -0)) // false
console.log(Object.is(0, -0)) // false
console.log(Object.is(0, +0)) // true
Object.is(NaN, 0/0);         // true

Polyfill
ES5 可以通过下面的代码，部署Object.is。
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true
});



2.Object.assign() 
Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
Object.assign()方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
Object.assign()拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。
推荐写法
const obj = Object.assign({}, obj1, obj2, obj3, ...object );

注意点
（1）浅拷贝
Object.assign()方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
const obj1 = {a: {b: 1}};
const obj2 = Object.assign({}, obj1);
obj1.a.b = 2;
obj2.a.b // 2

（2）同名属性的替换
对于这种嵌套的对象，一旦遇到同名属性，Object.assign()的处理方法是替换，而不是添加。
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
上面代码中，target对象的a属性被source对象的a属性整个替换掉了，而不会得到{ a: { b: 'hello', d: 'e' } }的结果。这通常不是开发者想要的，需要特别小心。
一些函数库提供Object.assign()的定制版本（比如 Lodash 的_.defaultsDeep()方法），可以得到深拷贝的合并。

（3）数组的处理
Object.assign()可以用来处理数组，但是会把数组视为对象。
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
Object.assign({
    0: 1,
    1: 2,
    2: 3,
}, {
    0: 4,
    1: 5
})
上面代码中，Object.assign()把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。

（4）取值函数的处理
Object.assign()只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
const source = {
  get foo() { return 1 }
};
const target = {};
Object.assign(target, source)
// { foo: 1 }
上面代码中，source对象的foo属性是一个取值函数，Object.assign()不会复制这个取值函数，只会拿到值以后，将这个值复制过去。



常见用途
Object.assign()方法有很多用处。

（1）为对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
上面方法通过Object.assign()方法，将x属性和y属性添加到Point类的对象实例。

（2）为对象添加方法
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});
// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign()方法添加到SomeClass.prototype之中。


3.Object.getOwnPropertyDescriptors()

ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。

const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,
//      configurable: true } }
上面代码中，Object.getOwnPropertyDescriptors()方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。

该方法的实现非常容易。

function getOwnPropertyDescriptors(obj) {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return result;
}
该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

const source = {
  set foo(value) {
    console.log(value);
  }
};

const target1 = {};
Object.assign(target1, source);

Object.getOwnPropertyDescriptor(target1, 'foo')
// { value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true }
上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。

这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。

const source = {
  set foo(value) {
    console.log(value);
  }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }
上面代码中，两个对象合并的逻辑可以写成一个函数。

const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
);
Object.getOwnPropertyDescriptors()方法的另一个用处，是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。

const clone = Object.create(Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj));

// 或者

const shallowClone = (obj) => Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
上面代码会克隆对象obj。

另外，Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象。以前，继承另一个对象，常常写成下面这样。

const obj = {
  __proto__: prot,
  foo: 123,
};
ES6 规定__proto__只有浏览器要部署，其他环境不用部署。如果去除__proto__，上面代码就要改成下面这样。

const obj = Object.create(prot);
obj.foo = 123;

// 或者

const obj = Object.assign(
  Object.create(prot),
  {
    foo: 123,
  }
);
有了Object.getOwnPropertyDescriptors()，我们就有了另一种写法。

const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);
Object.getOwnPropertyDescriptors()也可以用来实现 Mixin（混入）模式。

let mix = (object) => ({
  with: (...mixins) => mixins.reduce(
    (c, mixin) => Object.create(
      c, Object.getOwnPropertyDescriptors(mixin)
    ), object)
});

// multiple mixins example
let a = {a: 'a'};
let b = {b: 'b'};
let c = {c: 'c'};
let d = mix(c).with(a, b);

d.c // "c"
d.b // "b"
d.a // "a"
上面代码返回一个新的对象d，代表了对象a和b被混入了对象c的操作。

出于完整性的考虑，Object.getOwnPropertyDescriptors()进入标准以后，以后还会新增Reflect.getOwnPropertyDescriptors()方法。



4.__proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
JavaScript 语言的对象继承是通过原型链实现的。ES6 提供了更多原型对象的操作方法。

__proto__属性
__proto__属性（前后各两个下划线），用来读取或设置当前对象的原型对象（prototype）。目前，所有浏览器（包括 IE11）都部署了这个属性。
// es5 的写法
const obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;
// es6 的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };
该属性没有写入 ES6 的正文，而是写入了附录，原因是__proto__前后的双下划线，说明它本质上是一个内部属性，而不是一个正式的对外的 API，只是由于浏览器广泛支持，才被加入了 ES6。标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的。因此，无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。
实现上，__proto__调用的是Object.prototype.__proto__，具体实现如下。
Object.defineProperty(Object.prototype, '__proto__', {
  get() {
    let _thisObj = Object(this);
    return Object.getPrototypeOf(_thisObj);
  },
  set(proto) {
    if (this === undefined || this === null) {
      throw new TypeError();
    }
    if (!isObject(this)) {
      return undefined;
    }
    if (!isObject(proto)) {
      return undefined;
    }
    let status = Reflect.setPrototypeOf(this, proto);
    if (!status) {
      throw new TypeError();
    }
  },
});
function isObject(value) {
  return Object(value) === value;
}
如果一个对象本身部署了__proto__属性，该属性的值就是对象的原型。
Object.getPrototypeOf({ __proto__: null })
// null


Object.setPrototypeOf()
Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的原型对象（prototype），返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
// 格式
Object.setPrototypeOf(object, prototype)
// 用法
const o = Object.setPrototypeOf({}, null);
该方法等同于下面的函数。
function setPrototypeOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
下面是一个例子。
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
proto.y = 20;
proto.z = 40;
obj.x // 10
obj.y // 20
obj.z // 40
上面代码将proto对象设为obj对象的原型，所以从obj对象可以读取proto对象的属性。
如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true
由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined
Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined


Object.getPrototypeOf()
该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
Object.getPrototypeOf(obj);
下面是一个例子。
function Rectangle() {
  // ...
}
const rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype
// true
Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype
// false
如果参数不是对象，会被自动转为对象。
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}
// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}
// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}
Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true
如果参数是undefined或null，它们无法转为对象，所以会报错。
Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object
Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object



5.Object.keys()，Object.values()，Object.entries()


Object.keys()
ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };
for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}
for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}
for (let [key, value] of entries(obj)) {
console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]


Object.values()
Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。
const obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)
// ["b", "c", "a"]
上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。
Object.values只返回对象自身的可遍历属性。
const obj = Object.create({}, {p: {value: 42}});
Object.values(obj) // []
上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。

const obj = Object.create({}, {p:
  {
    value: 42,
    enumerable: true
  }
});
Object.values(obj) // [42]
Object.values会过滤属性名为 Symbol 值的属性。
Object.values({ [Symbol()]: 123, foo: 'abc' });
// ['abc']
如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。
Object.values('foo')
// ['f', 'o', 'o']
上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。
如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。
Object.values(42) // []
Object.values(true) // []
Object.entries()
Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
const obj = { foo: 'bar', baz: 42 };


Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
除了返回值不一样，该方法的行为与Object.values基本一致。
如果原对象的属性名是一个 Symbol 值，该属性会被忽略。
Object.entries({ [Symbol()]: 123, foo: 'abc' });
// [ [ 'foo', 'abc' ] ]
上面代码中，原对象有两个属性，Object.entries只输出属性名非 Symbol 值的属性。将来可能会有Reflect.ownEntries()方法，返回对象自身的所有属性。
Object.entries的基本用途是遍历对象的属性。
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
  );
}
// "one": 1
// "two": 2
Object.entries方法的另一个用处是，将对象转为真正的Map结构。
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
自己实现Object.entries方法，非常简单。
// Generator函数的版本
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}
// 非Generator函数的版本
function entries(obj) {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
}



Object.fromEntries()
Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。
// 例一
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);
Object.fromEntries(entries)
// { foo: "bar", baz: 42 }
// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }
该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }




                    `}
                </code>
            </pre>
        )
    }

    render() {

        const aa = { [Symbol()]: 123, foo: 'abc' }
        const sy = Symbol('sy')
        const bb = { [Symbol('sy')]: sy, foo: 'abc' }

        console.log(Object.values(aa))
        console.log(Object.values(bb))
// ['abc']

        return (
            <div>
                {this.renderTitle()}
                {this.renderDemo()}
            </div>
        );
    }
}