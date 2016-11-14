var fs = require('fs');

function getFiles (dir, files_){
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
    var name = files[i];
    !/^s[a0-b9]+\.(jpg|gif|png)$/gi.test(name) ? console.log('ignore: ' +name) : files_.push(name)
  }
  return files_;
}
var aryimg = getFiles('images')
console.log(aryimg)
function slice(value){
    return /^s1.+\.(jpg|gif|png)$/.test(value);
}
console.log(aryimg.filter(slice))


// console.log('typeof aryimg: '+typeof aryimg)
var table = 'table', tr = 'tr', td = 'td', img ='img src="" alt=""';

function writeTable (imglist){
  fs.writeFile("var.slim", imglist, function(err){
    if(err) return console.log(err);
    console.log('the var.slim was write')
  })
}

// writeTable(aryimg)
