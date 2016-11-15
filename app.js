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
function slice (ary){
  // return /^s1.+\.(jpg|gif|png)$/.test(ary);
  var dynReg = new RegExp('^s'+s+'.+\.(jpg|gif|png)$','gi')
  return dynReg.test(ary);
}
// console.log(aryimg.filter(slice))

function cptSlice (ary) {
  var tabs = [];
  for (var i in ary) {
    tabs.push(ary[i].slice(1,2))
  }
  var result = [];
  tabs.filter(function(item, pos) {
    tabs.indexOf(item) == pos ? result.push(item) : item++;
  })
  console.log(result);
}
cptSlice(aryimg)

// écrire dans un fichier
function writeTable (imglist){
  fs.writeFile("var.slim", imglist, function(err){
    if(err) return console.log(err);
    console.log('the var.slim was write')
  })
}

