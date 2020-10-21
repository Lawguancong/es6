import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>正则的扩展</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {`


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