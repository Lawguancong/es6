import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>数值的扩展</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {`
二进制(Binary)字面量前缀：0b或0B。
八进制(Octal)：0。
十进制(Decimal)字面量无前缀。
十六进制(Hex)：0x或0X。

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