var inquirer = require("inquirer");
var mkdirp = require("mkdirp");
var fs = require("fs");
const ejs = require("ejs");
const addPageWithFrom = (list,path) => {
  let _path=''
  if(path){
    _path=path;
  }
  else{
    _path=process.cwd();
  }   
  //存在模板，按模板新增
  ejs.renderFile(
    `${_path}${list.from}`,
    { ...list.keys },
    (err, data) => {
      if (err) return console.log(err);
      addPage(list, data);
    }
  );
};

const addPage = (list, data) => {
  let  _path=process.cwd();  
  let filepath = `${_path}${list.to}`;
  let fileplace = filepath + list.name;
  mkdirp(filepath, (err) => {
    if (err) return console.log(err);
    //isReplace 默认为false，文件存在报错，如果为true，则文件存不报错
    fs.exists(fileplace, (exists) => {
      if (exists && !list.isReplace) return console.log(fileplace+' is exist');
    fs.writeFile(filepath + list.name, data, (err) => {
      if (err) return console.log(err);
      console.log("success " + list.type + " " + list.name);
    });      
    });

  });
};
const editPage=(list,detail,data,path)=>{
    let _path=''
    if(path){
      _path=path;
    }
    else{
      _path=process.cwd();
    }  
    let filepath = `${_path}${list.to}`;
    let fileplace = filepath + list.name; 
    var rdata=data+detail; 
    fs.writeFile(filepath + list.name, rdata, (err) => {
      if (err) return console.log(err);
      console.log("success " + list.type + " " + list.name);
    });  
}
const editPageWithFrom=(list,data,path)=>{
  let _path=''
  if(path){
    _path=path;
  }
  else{
    _path=process.cwd();
  }
  ejs.renderFile(
    `${_path}${list.from}`,
    { ...list.keys },
    (err, detail) => {
      if (err) return console.log(err);
      editPage(list,detail,data);
    }
  );
}
const editAll = (data,path) => {
  data.map((list) => {
    //新增页面
    if (list.type == "add") {
      //不存在模板，新增一个空页面
      if (list.from) addPageWithFrom(list,path);
      else addPage(list, "");
    }
    //编辑页面
    else if (list.type == "edit") {
      let filepath = `${process.cwd()}${list.to}`;
      let fileplace = filepath + list.name;
      ejs.renderFile(fileplace, (err,data) => {
        if(err) return console.log(err)
        //不存在模板，新增detail中的固定内容
        if (list.detail) editPage(list,list.detail,data,path);
        else if(list.from) editPageWithFrom(list,data,path);          
      })      
    }    
  });
};
const manage=(answers)=>{
      var { page,path } = answers;
      var rdata='';
      if(path){
        rdata=require(`${path}/.createPage.js`);
      }
      else{
        rdata=require(`${process.cwd()}/.createPage.js`);
      }
        if (!rdata) {
          console.log('no file .createPage.js');
        } else {
          if (rdata[page]) {
            for (var key in rdata) {
              if (page == key) {
                editAll(rdata[key],path);
                return;
              }
            }
          } else {
            console.log("no page to add");
          }
        }
}
module.exports = ({ name, type, args, path }) => {
  if(name){
    manage({page:name,path})
  }
  else{
    inquirer
      .prompt([
        {
          name: "page",
          type: "input",
          message: "input your page name",
        },
      ])
      .then((answers) => {
        manage(answers);
    });    
  }

};

