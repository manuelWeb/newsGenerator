var fs     = require('fs'),
    aryimg = getFiles('images'),
    slNiv1 = cptSlice(aryimg);
// retourne array des fichiers présents dans images folder
function getFiles (dir, files_){
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
    var name = files[i];
    !/^s[a0-b9]+\.(jpg|gif|png)$/gi.test(name) ? console.log('ignore: ' +name) : files_.push(name)
  }
  return files_;
}
// fct pour filtrer slices s=1 sort [ 's1c1.jpg', 's1c2.jpg', 's1c3.jpg' ]
function slice (ary){
  // var dynReg = new RegExp('^s'+s+'.+\.(jpg|gif|png)$','gi');
  var dynReg = new RegExp('^s'+s+'..(_l|)\.(jpg|gif|png)$','gi');
  return dynReg.test(ary);
}
// cptSlice retourne le nombre totale de slices sncn=niv1
function cptSlice (ary) {
  var tabs = [], result = [];
  for (var i in ary) { tabs.push(ary[i].slice(1,2)); }
  tabs.filter(function(item, pos) {
    if ( tabs.indexOf(item) == pos ) result.push(item);
  })
  return result;
}
// affiche s = numero slice
for (var s in slNiv1) {
  var s = ++s; // initialise s à 1 non à 0
  console.log('tr')// console.log(s); // s = slice unique
  // console.log(aryimg.filter(slice)); // = images par slice
  var tabs1 = [];
  var imgOnSce = function () {
    return aryimg.filter(slice);
  }
  tabs1.push(aryimg.filter(slice))
  // console.log(tabs1[0]);
  for (i in imgOnSce()){
    // console.log('  td' + '\n    ' +imgOnSce()[i].match(/_l/)!='' ? 'a href'+'\n'+'img src=' +imgOnSce()[i] : 'img src=' +imgOnSce()[i])
    var item = imgOnSce()[i];
    if (item.match(/_l/) == null){
      console.log('  td' + '\n    ' + item)
    }else{
      console.log('  td' + '\n    ' + 'a href=($'+item.slice(0,4)+')' +'\n      ' + item)
    }
  }
}
