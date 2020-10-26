import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1></h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`


Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。



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