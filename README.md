# TodoListApp

This is a single page to do list application, using the MEAN stack of technologies: MongoDB, Express.js, Angular 6, and Node. This application uses the technologies as follows:

MongoDB

The database of tasks is stored in a MongoDB database collection called tasks.

Express.js

Express is used for creating the APIs used for retrieving, saving, updating and deleting tasks, from the database

Angular

Angular is used to handle the dynamic front end and update the view, including a form to add a new task, displaying and filtering the to do list, and
making http requests to the APIs created using Express

Node.js

Node handles the server side programming and provides code management, through the Node Package Manager, of Node and third party programs, such as Angular.

RUN THE APPLICATION

Using Docker

In the todo-list-app directory run

docker run -p 4200:4200 todo-list-app:dev

Using NPM

npm start

TESTING

Unit and functional tests have been created using Mocha and Chai. To run the tests, in the todo-list-app directory run

npm test
