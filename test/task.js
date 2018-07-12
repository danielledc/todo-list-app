//During the test the env variable is set to test
process.env.NODE_ENV="test";
console.log(process.env.NODE_ENV);
let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let Task = require('../src/models/Task.js');


chai.use(chaiHttp);

describe('to do list app', function() {
  
  it('should return to do list app', function() {
     chai.request(app)
    .get("http://localhost:4200")
    .end((err,res)=>{
      res.should.have.status(200);
      res.body.error.should.equal(false);
      done();
    });
  });


});

describe('/GET to do list', () => {
      it('it should get all the tasks in the to do list', (done) => {
        chai.request(app)
            .get('/api/task')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      });
});

//test /POST route

describe('/POST task', () => {
      it('it should post a new task to database', (done) => {
        let task = {
            name: "Doctor's appointment",
            description: "Annual physical",
            dueDate: "07/20/2018",
			taskColor:"#fff",
			completed:false
        }
        chai.request(app)
            .post('/api/task')
            .send(task)
            .end((err, res) => {
				should.exist(res);
				res.should.have.status(200);
				res.body.should.be.a('object');
			    res.body.should.have.property('name');
                res.body.should.have.property('description');
                res.body.should.have.property('dueDate');
                res.body.should.have.property('taskColor');
				 res.body.should.have.property('completed');
              done();
            });
      });

});
  
describe('/PUT/:id task', () => {
      it('it should update a task given the id', (done) => {
        let task =new Task({name: "Project", description: "Web App Project", dueDate: "07/20/2018", taskColor: "#fff", completed:false});
        task.save((err, task) => {
                chai.request(app)
				.put('/api/task/' +task.id)
                .send({name: "Project", description: "Web App Project", dueDate: "07/20/2018", taskColor: "#fff", completed:true})
                .end((err, res) => {
                    should.exist(res);
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.completed.should.equal(true);
                  done();
                });
          });
      });
});

 describe('/DELETE/:id task', () => {
      it('it should delete a task from the to do list given the id', (done) => {
        let task = new Task({name: "Project", description: "Web App Project", dueDate: "07/20/2018", taskColor: "#fff", completed:false});
        task.save((err, task) => {
                chai.request(app)
                .delete('/api/task/' + task.id)
                .end((err, res) => {
					should.exist(res);
					res.should.have.status(200);
                    res.body.should.be.a('object');
                   done();
                });
          });
      });
  });