var fs=require('fs');
var path = require('path');
var node_modules  = path.resolve(__dirname,'..','node_modules');
var dist = path.resolve(__dirname,'..','dist/lib');
if(!fs.existsSync(dist)){  
    fs.mkdirSync(dist);
}
var files = {
    'react':{
        src:path.resolve(node_modules,'./react/dist/react.min.js'),
        dist:path.resolve(dist,'./react.min.js')
    } ,
    'react-dom':{
        src:path.resolve(node_modules,'./react-dom/dist/react-dom.min.js'),
        dist:path.resolve(dist,'./react-dom.min.js')
    }
};
for(var key in files){
    var data = fs.readFileSync(files[key].src);
    fs.writeFile(files[key].dist,data,function(err){
        if(err){
            console.log(err);
        }
    });
}