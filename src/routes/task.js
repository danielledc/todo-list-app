var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Task = require("../models/Task.js");

//GET /task route to get all tasks on list
router.get("/task", function(req, res, next) {
  Task.find(function(err, tasks) {
    if (err) return next(err);
    res.json(tasks);
  });
});

//POST to /task route to save new task to database collection
router.post("/task", function(req, res, next) {
  var taskInfo = new Task(req.body);
  taskInfo
    .save()
    .then(res.send(taskInfo))
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

//PUT to /task/:id route to update and save task given its id
router.put("/task/:id", function(req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function(err, task) {
    Object.assign(task, req.body).save((err, task) => {
      if (err) res.send(err);
      res.json(task);
    });
  });
});

//DELETE  /task/:id to delete task from database collection
router.delete("/task/:id", function(req, res, next) {
  Task.findByIdAndRemove(req.params.id, req.body, function(err, task) {
    if (err) return next(err);
    res.json(task);
  });
});

//export all functions
module.exports = router;
