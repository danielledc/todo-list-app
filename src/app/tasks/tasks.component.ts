import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import {IMyDpOptions} from 'mydatepicker';
import { TaskService } from '../task.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

//the TaskComponent class includes the properties and methods to interact and update the to do list app view
export class TasksComponent implements OnInit {

  
  public keysArray; //array of keys
  
  order: string = 'dueDate'; //used to order the tasks by date ascending by default
  tasks={}; //object containing new task data
  currentTasks={}; //object containing all tasks returned from database
  radioColor="#ccc"; //disabled radio button color
  todayDate=new Date().setHours(0,0,0,0); //today's date
  tomorrowDate=new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).setHours(0,0,0,0); //tomorrow's date
  toDoList=false; //boolean variable to show/hide "No Tasks" depending on whether there are no tasks.
  
  //default options for myDatePicker
  public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
		width:'200px'
    };

  constructor(private taskService: TaskService,private orderPipe: OrderPipe) { 
  

 }
 
 //call saveTask function on submit of form
  onSubmit(){
	 this.saveTask();
  }
  
  //on init, call getToDoList function to display all current tasks
  ngOnInit() {
	this.getToDoList();
	
  }
  
  //filterList function called on change of filter radio buttons,  and is passed val, which represents the filter condition
 filterList(val){
	this.keysArray=Object.keys(this.currentTasks);
	this.radioColor="#ccc";
	if(val=="completed"){
		return this.keysArray=this.keysArray.filter(item=>	this.currentTasks[item].completed==true);	
	 
	}
	else if(val=="overdue"){
		return this.keysArray=this.keysArray.filter(item=>	((Date.parse(this.currentTasks[item].dueDate)<this.todayDate)&&(this.currentTasks[item].completed==false)));	
	
	}
	else if(val=="duesoon"){
		this.radioColor="#000";
		return this.keysArray=this.keysArray.filter(item=>	Date.parse(this.currentTasks[item].dueDate)==this.todayDate ||Date.parse(this.currentTasks[item].dueDate)==this.tomorrowDate);	
	}
	else if(val=="duetomorrow"){
		this.radioColor="#000";
		return this.keysArray=this.keysArray.filter(item=>	Date.parse(this.currentTasks[item].dueDate)==this.tomorrowDate);	
	}
	else if(val=="duetoday"){
		this.radioColor="#000";
		return this.keysArray=this.keysArray.filter(item=>	Date.parse(this.currentTasks[item].dueDate)==this.todayDate);	
	}
 }
 
  //display all tasks again after filtering
  resetFilter(){
	  return this.keysArray=Object.keys(this.currentTasks);
  }
  
  //display all tasks calling the getToDoList function defined in TaskService
  getToDoList() {
    this.taskService.getToDoList().then((res) => {
	
	//apply pipe to data to order by duedate
	this.currentTasks =this.orderPipe.transform(res, this.order);
	
	//retrieve keys from currentTasks object in order to display in view using ngFor
	this.keysArray=Object.keys(this.currentTasks);
	if(this.keysArray.length!=0)this.toDoList=true;
	else this.toDoList=false;
	 
    }, (err) => {
      console.log(err);
    });
  }
  //save task, passing this.tasks to saveTask function defined in TaskService
  saveTask() {
	 //update dueDate to correct format
	this.tasks["dueDate"]=this.tasks["dueDate"].formatted;
	//initialize completed property to false
	this.tasks["completed"]=false;
	//this.tasks["taskColor"] is a property to determine which background to display in table, for those tasks that are overdue or due soon (tomorrow or today)
	if(Date.parse(this.tasks["dueDate"])==this.todayDate ||Date.parse(this.tasks["dueDate"])==this.tomorrowDate){
		this.tasks["taskColor"]="#ffff00";
	}
	else if((Date.parse(this.tasks["dueDate"])<this.todayDate)&&(this.tasks["completed"]==false)){
		this.tasks["taskColor"]="#ff0000";
	}	
	else{
		this.tasks["taskColor"]="#fff";
	}

	this.taskService.saveTask(this.tasks).then((res) => {
	 //update view by calling getToDoList function
     this.getToDoList();
    }, (err) => {
      console.log(err);
    });
  }
  //update completed to true for task with id taskID, passing taskID and completed to updateTask function defined in TaskService
  updateTaskStatus(taskID,completed) {
	
	this.taskService.updateTask(taskID, {'completed': completed}).then((res) => {
     this.getToDoList();
    }, (err) => {
      console.log(err);
    });
  }
  //delete task with id taskID, passing taskID to deleteTask function defined in TaskService
 
  deleteTask(taskID) {
	this.taskService.deleteTask(taskID).then((res) => {
     this.getToDoList();
    }, (err) => {
      console.log(err);
    });
  }
  

  }  

