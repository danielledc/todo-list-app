var mongoose = require('mongoose');

//task schema definition
var TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: String,  
  taskColor:String,
  completed: Boolean
}, {collection: 'todos'});

var Task = mongoose.model('Task', TaskSchema);

//export TaskSchema
module.exports=Task;