var inquirer =require('inquirer');
var fs = require('fs');
const types = fs
  .readdirSync(`${__dirname}/../types`)
  .map(name => {
    return name
  });
module.exports= async()=>{
  inquirer.prompt([
  {
    name:'project',
    type:'input',
    message:'input your project name'
  },{
    name:'type',
    type:'list',
    message:'choose your favourite thing',
    choices:types
  }
  ]).then(answers=>{
    var {project,name,type}=answers;
    //生成项目
    
  })
}