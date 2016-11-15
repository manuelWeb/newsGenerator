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

var s = '1';
function slice(ary){
  // return /^s1.+\.(jpg|gif|png)$/.test(ary);
  var dynReg = new RegExp('^s'+s+'.+\.(jpg|gif|png)$','gi')
  return dynReg.test(ary);
}
console.log(aryimg.filter(slice))

function sortSlice(imgarray, slice){
  var re = new RegExp("s" + slice + ".+\.(jpg|gif|png)","gi"),
      result = [];
  for (var i in imgarray){
    result.push(imgarray[i].match(re))
  }
  return result;
}
// console.log(sortSlice(aryimg,'1'));

// écrire dans un fichier
function writeTable (imglist){
  fs.writeFile("var.slim", imglist, function(err){
    if(err) return console.log(err);
    console.log('the var.slim was write')
  })
}

