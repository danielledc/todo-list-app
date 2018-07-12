let mongoose = require('mongoose');

let coll;
//task schema definition

if(process.env.NODE_ENV!="test"){
	coll={collection: 'todos'}
}
else  coll={collection:'todos-test'};
let TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: String,  
  taskColor:String,
  completed: Boolean
},coll);

let Task= mongoose.model('Task', TaskSchema)

//export TaskSchema
module.exports=Task;