import React from 'react';



export default class Comp extends React.PureComponent {


    renderTitle = () =>{
        return <h1>字符串的扩展</h1>
    }


    renderDemo = () => {


        return (
            <pre>
                <code>
                    {String.raw`
1. 字符的 Unicode 表示法

\\uxxxx
\\u0000 ~ \\uFFFF
从 0 开始算
F = 16 - 1 = 15
单字节 FFFF = -> 16 * 16 * 16 * 16 = 65536 - 1 = 65535
双字节 65535 * 65535

console.log('\\uD842\\uDFB7') -> console.log('\uD842\uDFB7')
console.log('\\u20BB7') -> '\\u20BB' + 7 ->  console.log('\u20BB7')

'\\z' === 'z'  // true
'\\172' === 'z' // true
'\\x7A' === 'z' // true
'\\u007A' === 'z' // true
'\\u{7A}' === 'z' // true

"\ua123" === "\uA123" === "\u{a123}" === "\u{A123}" === "\u{0a123}" === "\u{0A123}"

'\u{1F680}' === '\uD83D\uDE80'

ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历。
for (let codePoint of 'foo') {
  console.log(codePoint)
}
// "f"
// "o"
// "o"
除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。
let text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "
for (let i of text) {
  console.log(i);
}
// "𠮷"
上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符。

JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
U+005C：反斜杠（reverse solidus)
U+000D：回车（carriage return）
U+2028：行分隔符（line separator）
U+2029：段分隔符（paragraph separator）
U+000A：换行符（line feed）
举例来说，字符串里面不能直接包含反斜杠，一定要转义写成\\或者\u005c。

这个规定本身没有问题，麻烦在于 JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被JSON.parse解析，就有可能直接报错。
const json = '"\u2028"';
JSON.parse(json); // 可能报错
JSON 格式已经冻结（RFC 7159），没法修改了。为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。
const PS = eval("'\u2029'");
根据这个提案，上面的代码不会报错。
注意，模板字符串现在就允许直接输入这两个字符。
另外，正则表达式依然不允许直接输入这两个字符，这是没有问题的，因为 JSON 本来就不允许直接包含正则表达式。


4. JSON.stringify() 的改造
根据标准，JSON 数据必须是 UTF-8 编码。

补充：
Unicode 编码规范
编码的实现：UTF-8 UTF-16 UTF-32 GB2312

Unicode是一个编码方案，Unicode 是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。
Unicode 编码共有三种具体实现，分别为utf-8,utf-16,utf-32，其中utf-8占用一到四个字节，utf-16占用二或四个字节，utf-32占用四个字节。目前Unicode 码在全球范围的信息交换领域均有广泛的应用。

html -> head > <meta charset="utf-32" />, 同时 浏览器的编码得支持 UTF-32。


5. 模板字符串

模板字符串之中还能调用函数。

function fn() {
  return "Hello World";
}

\`foo \$\{fn()\} bar\`
// foo Hello World bar

return \`4\$\{aa || ''\}\`


模板字符串甚至还能嵌套，还能模板字符串。

const tmpl = addrs => \`
  <table>
  \${addrs.map(addr => \`
    <tr><td>\${addr.first}</td></tr>
    <tr><td>\${addr.last}</td></tr>
  \`).join('')}
  </table>
\`;


6. 模板编译
该模板使用<%...%>放置 JavaScript 代码，使用<%= ... %>输出 JavaScript 表达式。

                    `}
                </code>
            </pre>
        )
    }
   
    // 嵌套 模板字符串
    renderStr1 = addrs => `
        <table>
            ${addrs.map(addr => `
                <tr><td>${addr.first}</td></tr>
                <tr><td>${addr.last}</td></tr>
            `).join('')}
        </table>
    `;

    renderStr2 = data => <p>{`${data.map(item => <h5>{`${item}`}</h5>)}`}</p>

    renderStr3 = () => <h1>{`左边${`dfsf${`看交流交流`}sfsdf`}右边`}</h1>

    renderStr4 = () => <h1>{`左边${`dfsf${<h2>{`看交流交流`}</h2>}sfsdf`}右边`}</h1>

    renderStr5 = () => `<a>${'lgc'}</a>`
    render() {
        
        let template = `
            <ul>
            <% for(let i=0; i < data.supplies.length; i++) { %>
                <li><%= data.supplies[i] %></li>
            <% } %>
            </ul>
        `;
        return (
            <div>
                {this.renderTitle()}
                {this.renderDemo()}
                {this.renderStr1( [
                    { first: '<Jane>', last: 'Bond' },
                    { first: 'Lars', last: '<Croft>' },
                ])}
                {this.renderStr2(['1', '2', '3', '4'])}
                {this.renderStr3()}
                {this.renderStr4()}
                {this.renderStr5()}
            </div>
        );
    }
}