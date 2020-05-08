## create-page
Based on EJS, a tool for quickly generating pages according to custom templates
基于ejs，根据自定义模板快速搭建页面的脚手架

## Install
```
$ npm install create-page -g
```

## Usage
进入你需要快速新建页面的工程
并且再工程内新增 .createPage.js 文件

## .createPage.js Usage Example（新增案例）
```
module.exports={
    "Test2": [
        {
            "type": "add",
            "name":"Test2.js",
            "from": "/templatePage/normal.js",
            "to": "/page/Test2/",
            "keys": { "name": "Test2的模块", "page": "Test2" },
            "isReplace":true
        }
    ]
}

```
实例中的Test2为执行create-page时对应的key
新增完配置文件.createPage.js后，具体执行命令如下：
```
$ create-wmsapp
? input your page name Test2
success add Test2.js
```

当输入的page name和配置的.createPage.js中配置的key无一匹配时，会报错如下：
```
$ create-wmsapp
? input your page name Test3
no page to add

```

## .createPage.js 配置参数说明

<table>
    <tr>
        <td>参数</td><td>说明</td>
    </tr>
    <tr>
        <td>type</td><td>add/edit,add为新增文件，edit为编辑已有文件（此模式在需要编辑的文件末尾新增需要新增的内容）</td>
    </tr>
    <tr>
        <td>name</td><td>新增或者编辑的文件名</td>
    </tr>
    <tr>
        <td>to</td><td>新增或者编辑的文件所在的路径</td>
    </tr>   
    <tr>
        <td>from</td><td>模板文件所在的地址，以及模板文件名。如果此字段为空或不存在，则默认新增一个空文件</td>
    </tr> 
    <tr>
        <td>keys</td><td>ejs模板中替换的key的名称（具体参照模板说明中的使用方式）</td>
    </tr> 
    <tr>
        <td>detail</td><td>该参数只针对type=edit有效，编辑文件时，文件末尾新增detail里的内容。如果此字段为空，则文件末尾新增模板对应的内容</td>
    </tr>     
    <tr>
        <td>isReplace</td><td>该参数只针对type=add有效，当新增的文件存在时，为true则替换，为false则不替换。默认为false</td>
    </tr>                       
</table>

## 模板说明
ejs的官网说明：https://ejs.bootcss.com/
根据以上.createPage.js
例如keys的内容为："keys": { "name": "Test2的模块", "page": "Test2" }
keys中的内容，其实就相当于ejs.render(str, data, options);中的options的值
对应的模板/templatePage/normal.js内容如下：
```
import React from 'react';
class <%= page %> extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Hi，<%= name %>
      </div>
    );
  }
}
export default <%= page %>;
```
则执行了以下命令后
```
$ create-wmsapp
? input your page name Test3
no page to add

```
会在/page/Test2/生成一个Test2.js文件，对应的js文件内容如下
```
import React from 'react';
class Test2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Hi，Test2的模块
      </div>
    );
  }
}
export default Test2;
```

## edit案例
如果.createPage.js 配置如下
```
module.exports={
    "Test2": [
        {
            "type": "add",
            "name":"Test2.js",
            "from": "/templatePage/normal.js",
            "to": "/page/Test2/",
            "keys": { "name": "Test2的模块", "page": "Test2" },
            "isReplace":true
        },
        {
            "type": "edit",
            "name":"detail.js",
            "details": "console.log(a);",
            "to": "/page/Test2/"
        }        
    ]
}

```
原先detail.js文件内容如下
```
var a=1;
```
执行了命令后，原先的 detail.js文件末尾会被新增details中的内容，变成如下内容
```
var a=1;
console.log(a);
```

如果edit的内容变成如下，则意味着detail.js新增模板normal.js的内容
```
        {
            "type": "edit",
            "name":"detail.js",
            "from": "/templatePage/normal.js",
            "keys": { "name": "detail的模块", "page": "Detail" },
            "to": "/page/Test2/"
        }  
```
则detail.js文件会被编辑为：
```
var a=1;
import React from 'react';
class Detail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Hi，detail的模块
      </div>
    );
  }
}
export default Detail;
```
