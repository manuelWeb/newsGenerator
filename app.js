var fs = require('fs');

function getFiles (dir, files_){
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
    var name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()){
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}
console.log(getFiles('images'))

var aryimg = getFiles('images')
// console.log('typeof aryimg: '+typeof aryimg)
var table = 'table', tr = 'tr', td = 'td', img ='img src="" alt=""';

function writeTable (imglist){
  fs.writeFile("var.slim", imglist, function(err){
    if(err) return console.log(err);
    console.log('the var.slim was write')
  })
}

// writeTable(aryimg)
