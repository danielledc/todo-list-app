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

docker run -p 4200:4200 todo-list-app

TESTING

Unit and functional tests have been created using Mocha and Chai. To run the tests, in the todo-list-app directory run

npm test

DIRECTORY STRUCTURE AND RELEVANT FILES

todo-list-app/

app.js -  creates an Express app, sets up the app with various settings, and then exports the app from the module

bin/

www - the app entry point

Dockerfile - text document containing all  commands to assemble a Docker image.

package.json - packages that the app project depends on

README.md

src/app/

app.component.ts    - application shell component class code, written in TypeScript.

app.component.html  - the application shell component HTML template.

app.component.css   - the application shell component's CSS styles.

task.service.ts  -    Task service

task.ts

tasks/

tasks.component.html - task component class code, written in TypeScript

tasks.component.ts   - task component HTML template

tasks.component.css  - task component CSS styles

routes/

task.js - defines Express routes

models/

Task.js - defines mongoose schema definition

styles.css - global stylesheet

test/

task.js - unit test file

