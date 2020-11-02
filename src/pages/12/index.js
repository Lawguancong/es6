import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>对象</h1>
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


(1)Object 构造函数的属性

Object.length
值为 1。
Object.prototype
可以为所有 Object 类型的对象添加属性。
Object.prototype 属性的属性特性：
writable	false
enumerable	false
configurable	false


(2)Object 构造函数的方法

Object.assign()
通过复制一个或多个对象来创建一个新的对象。

Object.create()
使用指定的原型对象和属性创建一个新对象。

Object.defineProperty()
给对象添加一个属性并指定该属性的配置。

Object.defineProperties()
给对象添加多个属性并分别指定它们的配置。

Object.entries()
返回给定对象自身可枚举属性的 [key, value] 数组。

Object.freeze()
冻结对象：其他代码不能删除或更改任何属性。

Object.getOwnPropertyDescriptor()
返回对象指定的属性配置。

Object.getOwnPropertyNames()
返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名。

Object.getOwnPropertySymbols()
返回一个数组，它包含了指定对象自身所有的符号属性。

Object.getPrototypeOf()
返回指定对象的原型对象。

Object.is()
比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。

Object.isExtensible()
判断对象是否可扩展。

Object.isFrozen()
判断对象是否已经冻结。

Object.isSealed()
判断对象是否已经密封。

Object.keys()
返回一个包含所有给定对象自身可枚举属性名称的数组。

Object.preventExtensions()
防止对象的任何扩展。

Object.seal()
防止其他代码删除对象的属性。

Object.setPrototypeOf()
设置对象的原型（即内部 [[Prototype]] 属性）。

Object.values()
返回给定对象自身可枚举值的数组。







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