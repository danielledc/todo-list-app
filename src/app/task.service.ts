import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()


export class TaskService {

  constructor(private http: Http) { }

  //return a promise that either resolves to the data retrieved from the database, or rejects with an error
  getToDoList() {
    return new Promise((resolve, reject) => {
      this.http.get('/api/task')
       .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  //return a promise that makes HTTP request to /api/task resolves to the data saved to the database data retrieved from the database, or rejects with an error
  saveTask(data) {
    return new Promise((resolve, reject) => {
		this.http.post('/api/task', data)
		.subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  //return a Promise that makes HTTP request to /api/task/:id with the id and data for the task to update, and either resolves to the data updated or rejects with an error
  updateTask(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/api/task/'+id, data)
          .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
	//return a Promise that makes HTTP request to /api/task/:id with the id of the task to delete, and either resolves to the data deleted or rejects with an error
  
  deleteTask(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/api/task/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}