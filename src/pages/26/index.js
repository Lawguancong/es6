import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>Decorator 装饰器</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`

[说明] Decorator 提案经过了大幅修改，目前还没有定案，不知道语法会不会再变。下面的内容完全依据以前的提案，已经有点过时了。等待定案以后，需要完全重写。
装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。许多面向对象的语言都有这项功能，目前有一个提案将其引入了 ECMAScript。
装饰器是一种函数，写成@ + 函数名。它可以放在类和类方法的定义前面。
@frozen class Foo {
  @configurable(false)
  @enumerable(true)
  method() {}

  @throttle(500)
  expensiveMethod() {}
}
上面代码一共使用了四个装饰器，一个用在类本身，另外三个用在类方法。它们不仅增加了代码的可读性，清晰地表达了意图，而且提供一种方便的手段，增加或修改类的功能。


1.类的装饰
装饰器可以用来装饰整个类。

@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
上面代码中，@testable就是一个装饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。testable函数的参数target是MyTestableClass类本身。

基本上，装饰器的行为就是下面这样。

@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
也就是说，装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。

function testable(target) {
  // ...
}
上面代码中，testable函数的参数target，就是会被装饰的类。

如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。

function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
上面代码中，装饰器testable可以接受参数，这就等于可以修改装饰器的行为。

注意，装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。

前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作。

function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
上面代码中，装饰器函数testable是在目标类的prototype对象上添加属性，因此就可以在实例上调用。

下面是另外一个例子。

// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// main.js
import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'
上面代码通过装饰器mixins，把Foo对象的方法添加到了MyClass的实例上面。可以用Object.assign()模拟这个功能。

const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'
实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。

class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
有了装饰器，就可以改写上面的代码。

@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
相对来说，后一种写法看上去更容易理解。



2.方法的装饰
装饰器不仅可以装饰类，还可以装饰类的属性。

class Person {
  @readonly
  name() { return '{this.first} {this.last}' }
}
上面代码中，装饰器readonly用来装饰“类”的name方法。

装饰器函数readonly一共可以接受三个参数。

function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);


如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

function dec(id){
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
上面代码中，外层装饰器@dec(1)先进入，但是内层装饰器@dec(2)先执行。

除了注释，装饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。


3.为什么装饰器不能用于函数？

。。。待补充













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