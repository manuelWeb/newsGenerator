var fs     = require('fs'),
    aryimg = getFiles('images'),
    slNiv1 = cptSlice(aryimg);
console.log(cptSlice(aryimg));
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
  var dynReg = new RegExp('^s'+s+'.+\.(jpg|gif|png)$','gi');
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
var idt = function(nb){return ' '.repeat(nb)},
tab0 = 'table border="0" cellpadding="0" cellspacing="0"\n',
a = {
  href: 'a href=', targ: 'target="_blank"',
  add: function(item){return this.href + '($' + item + ') ' + this.targ + '\n'}
},
img = {
  img: 'img ',
  src: 'src=$imgSrc',
  bd0: 'border="0"',
  alt: 'alt=',
  reg : /^([a9-z0].+)?\./, // find all before .
  add: function(item){return this.img + this.src + '+"' + item + '" ' + img.bd0 + idt(1) + img.alt + item.match(this.reg)[1] }
}
for (var s in slNiv1) {
  var s = ++s; // initialise s à 1 non à 0
  console.log('tr');// console.log(s); // s = slice unique
  // console.log(aryimg.filter(slice)); // = images par slice
  var tabs1 = [];
  var imgOnSce = function () { return aryimg.filter(slice); }
  tabs1.push(aryimg.filter(slice))
console.log(aryimg.filter(slice));
  for (i in imgOnSce()){
    var item = imgOnSce()[i];
    if (!item.match(/_l/g) && item.length == '8'){
      // console.log(idt(2) + 'td\n' + idt(4) + item)
      console.log(idt(2) + 'td\n' + idt(4) + img.add(item))
    }else if (item.match(/_l/g) && item.length == '10'){
      console.log(idt(2) + 'td\n' + idt(4) + a.add(item.slice(0,4)) + idt(6) + img.add(item))
    }else if (!item.match(/_l/g) && item.length == '12'){
      console.log(idt(2) + 'td\n' + idt(4) + 'table\n' + idt(6) + 'tr\n'+ idt(8) + 'td\n' + idt(10) + item)
    }else if (item.match(/_l/g) && item.length == '14'){
      console.log(idt(2) + 'td\n' + idt(4) + 'table\n' + idt(6) + 'tr\n'+ idt(8) + 'td\n' + idt(10) + a.add(item.slice(0,8)) + idt(12) + item)
    }
  }
}

