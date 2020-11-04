import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>Set & Map 数据结构</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`


1. Set 集合
Set (value)
has(): 查找 值，比如M Set.prototype.has(key)、WeakSet.prototype.has(key)
键值弱引用

Set 实例的属性和方法
Set 结构的实例有以下属性。
Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。
Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
Set.prototype.clear()：清除所有成员，没有返回值。
Set.prototype.keys()：返回键名的遍历器
Set.prototype.values()：返回键值的遍历器
Set.prototype.entries()：返回键值对的遍历器
Set.prototype.forEach()：使用回调函数遍历每个成员

它类似于数组，但是成员的值都是唯一的，没有重复的值。
Set本身是一个构造函数，用来生成 Set 数据结构。
Set的长度 -> size
const s = new Set([1,2,3,4,5]);
s.siez = 5
Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// 去除数组的重复成员
[...new Set(array)]
上面的方法也可以用于，去除字符串里面的重复字符。
[...new Set('ababbc')].join('')
// "abc"

向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
上面代码向 Set 实例添加了两次NaN，但是只会加入一个。这表明，在 Set 内部，两个NaN是相等的。
另外，两个对象总是不相等的。
let set = new Set();
set.add({});
set.size // 1
set.add({});
set.size // 2

let set = new Set();
set.add([]);
set.size // 1
set.add([]);
set.size // 2
上面代码表示，由于两个空对象不相等，所以它们被视为两个值。

使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}
// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6
// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6



2. WeakSet 弱集合
用途：解决内存泄漏
弱引用
成员只能对象，且受内存机制影响
不能遍历，没有size属性
键值弱引用

Set可以存储值类型和对象引用类型，而WeakSet只能存储对象引用类型，否则会抛出TypeError。
WeakSet不能包含无引用的对象，否则会被自动清除出集合（垃圾回收机制）。
WeakSet对象是不可枚举的，也就是说无法获取大小，也无法获取其中包含的元素。

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
console.log(ws)
console.log(a) // 要引用， 否则会被垃圾回收






3. Map 映射
Map (key)
键名弱引用，键值正常引用
has(): 查找键名的，比如M ap.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
const data = {};
const element = document.getElementById('myDiv');
data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"
上面代码原意是将一个 DOM 节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。
为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

const m = new Map();
const o = {p: 'Hello World'};
const o1 = o;
m.set(o, 'content')
o.p = 'pppppp';
o1.p = undefined;
console.log( m.get(o)) // "content"
console.log( m.get(o1)) // "content"
console.log( m.get({p: 'Hello World'})) // undefined

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
const map = new Map();
map.set(['a'], 555);
map.get(['a']) // undefined
上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的
Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
如果 Map 的键是一个简单类型的值（undefined、null、数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，
const map = new Map();
map.set('abc', 6666);
console.log(map.get('abc')) // 6666

let map = new Map();
map.set(-0, 123);
map.get(+0) // 123
map.set(true, 1);
map.set('true', 2);
map.get(true) // 1
map.set(undefined, 3);
map.set(null, 4);
map.get(undefined) // 3
map.set(NaN, 123);
map.get(NaN) // 123

实例的属性和操作方法
Map.prototype.size
Map.prototype.set(key, value)
Map.prototype.get(key)
Map.prototype.has(key)
Map.prototype.delete(key)
Map.prototype.clear()

set方法返回的是当前的Map对象，因此可以采用链式写法。
let map = new Map()
.set(1, 'a')
.set(2, 'b')
.set(3, 'c');

const m = new Map();
const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数
m.get(hello)  // Hello ES6!

const map = new Map([
    ['F', 'no'],
    ['T',  'yes'],
]);
for (let key of map.keys()) {
    console.log(key);
}
// "F"
// "T"
for (let value of map.values()) {
    console.log(value);
}
// "no"
// "yes"
for (let item of map.entries()) {
    console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"
// 或者
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
// "F" "no"
// "T" "yes"
// 等同于使用map.entries()
for (let [key, value] of map) {
    console.log(key, value);
}
// "F" "no"
// "T" "yes"
上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
map[Symbol.iterator] === map.entries
// true

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);
[...map.keys()]
// [1, 2, 3]
[...map.values()]
// ['one', 'two', 'three']
[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]
[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}
const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
此外，Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。

map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

forEach方法还可以接受第二个参数，用来绑定this。
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};
map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
上面代码中，forEach方法的回调函数的this，就指向reporter。


（1）Map 转为数组
前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）。
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

（2）数组 转为 Map
将数组传入 Map 构造函数，就可以转为 Map。
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

（3）Map 转为对象
如果所有 Map 的键都是字符串，它可以无损地转为对象。
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

（4）对象转为 Map
对象转为 Map 可以通过Object.entries()。
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
此外，也可以自己实现一个转换函数。
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}

（5）Map 转为 JSON
Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'

（6）JSON 转为 Map
JSON 转为 Map，正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}



4. WeakMap 弱映射
用途：解决内存泄漏
WeakMap结构与Map结构类似，也是用于生成键值对的集合。
WeakMap只接受对象([]、{}、function等)作为键名，不接受其他类型的值作为键名。
WeakMap的键名所指向的对象，不计入垃圾回收机制。
指向的对象，受外部影响。
WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
键名弱引用，键值正常引用
WeakMap 与 Map 在 API 上的区别主要是两个，
一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
二是无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。
一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。
当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
const wm = new WeakMap();
const element = document.getElementById('example');
wm.set(element, 'some information');
wm.get(element) // "some information"
上面代码中，先新建一个 Weakmap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。
也就是说，上面的 DOM 节点对象的引用计数是1，而不是2。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。
注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
const wm = new WeakMap(); // new Map() 同结果
let key = {};
let obj = {foo: 1};
wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
上面代码中，键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。

WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。


const wm = new WeakMap();
// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined


WeakMap 的示例
WeakMap 的例子很难演示，因为无法观察它里面的引用会自动消失。此时，其他引用都解除了，已经没有引用指向 WeakMap 的键名了，导致无法证实那个键名是不是存在。
贺师俊老师提示，如果引用所指向的值占用特别多的内存，就可以通过 Node 的process.memoryUsage方法看出来。根据这个思路，网友vtxf补充了下面的例子。
首先，打开 Node 命令行。
$ node --expose-gc
上面代码中，--expose-gc参数表示允许手动执行垃圾回收机制。
然后，执行下面的代码。
// 手动执行一次垃圾回收，保证获取的内存使用状态准确
> global.gc();
undefined
// 查看内存占用的初始状态，heapUsed 为 4M 左右
> process.memoryUsage();
{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }
> let wm = new WeakMap();
undefined
// 新建一个变量 key，指向一个 5*1024*1024 的数组
> let key = new Array(5 * 1024 * 1024);
undefined
// 设置 WeakMap 实例的键名，也指向 key 数组
// 这时，key 数组实际被引用了两次，
// 变量 key 引用一次，WeakMap 的键名引用了第二次
// 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
> wm.set(key, 1);
WeakMap {}
> global.gc();
undefined
// 这时内存占用 heapUsed 增加到 45M 了
> process.memoryUsage();
{ rss: 67538944,
  heapTotal: 7376896,
  heapUsed: 45782816,
  external: 8945 }
// 清除变量 key 对数组的引用，
// 但没有手动清除 WeakMap 实例的键名对数组的引用
> key = null;
null
// 再次执行垃圾回收
> global.gc();
undefined
// 内存占用 heapUsed 变回 4M 左右，
// 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
> process.memoryUsage();
{ rss: 20639744,
  heapTotal: 8425472,
  heapUsed: 3979792,
  external: 8956 }
上面代码中，只要外部的引用消失，WeakMap 内部的引用，就会自动被垃圾回收清除。由此可见，有了 WeakMap 的帮助，解决内存泄漏就会简单很多。
Chrome 浏览器的 Dev Tools 的 Memory 面板，有一个垃圾桶的按钮，可以强制垃圾回收（garbage collect）。这个按钮也能用来观察 WeakMap 里面的引用是否消失。


WeakMap 的用途
前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子。
let myWeakmap = new WeakMap();
myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;
document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
上面代码中，document.getElementById('logo')是一个 DOM 节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
WeakMap 的另一个用处是部署私有属性。
const _counter = new WeakMap();
const _action = new WeakMap();
class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));
c.dec()
c.dec()
// DONE
上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。


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