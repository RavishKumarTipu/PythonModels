let {PythonShell} = require('python-shell')
 
 PythonShell.defaultPythonPath = 'Python';
 //console.log(PythonShell);
PythonShell.runString('x=1+1;print(x)', null, function (err,results) {
  if (err) throw err;
  console.log('finished', results);
});