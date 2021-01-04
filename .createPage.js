module.exports={
	"test01":[{
                "type": "add",
                "name":"spaTemplate.js",
                "from": "/test/template/spaTemplate.js",
                "to": "/test/page/",
                "keys": {"name":`<%- name %>`,page:`<%- page %>`,"path":`<%- path %>`},
                "isReplace":true  
    }],
}