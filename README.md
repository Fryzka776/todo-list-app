# TodoListApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

## Setting up the Environment

Prerequisites:
Node.js: Required to run Angular CLI and install project dependencies.
Angular CLI: Tool for creating, building, and testing Angular applications.

Steps:
Install Node.js: Download and install the latest version of Node.js from https://nodejs.org/.
Install Angular CLI: In the terminal, enter the following command: npm install -g @angular/cli
Clone the Repository: Clone the project repository from GitHub or create a new project using Angular CLI.
Install Dependencies: In the project directory, run the command: npm install
Run the Development Server: In the terminal, enter: ng serve
The application will be available at http://localhost:4200/.

## Login Data

To access the full functionality of the application, users are required to log in using the following credentials:
Username: test
Password: test123

## Feature Description

The To-Do List project in Angular Material allows users to manage a list of tasks to be completed. Here is a list of available features:

a. Adding a Task: Users can add a new task by clicking the "Add" button. Upon saving, the task is added to the list.

b. Editing a Task: Users can edit an existing task by clicking the edit button. Upon saving, the changes are applied to the task.

c. Deleting a Task: Users can delete a task by clicking the delete button. Upon confirmation, the task is removed from the list.

d. Marking a Task as Done: Users can mark a task as done by clicking the "Done" button. The task is then moved to the list of completed tasks.

e. Task Filtering: Users can filter tasks based on their status: all, active (unfinished), or completed. The filter selection is done through a dropdown menu with available options.

## Data

Task data is fetched from the JSONPlaceholder server (https://jsonplaceholder.typicode.com/). Upon application startup, the data is retrieved and saved in local storage, ensuring availability even after page refresh.

## Unit Testing

The project includes unit tests for methods handling interaction with the JSONPlaceholder server. Tests verify the correctness of addTodo, getTodos, updateTodo, and deleteTodo methods.

## User Registration

Users have the option to register for a new account within the application. After selecting the appropriate option, users can provide their username and password, and then register with the system. A new user is assigned a unique ID greater than 10 to avoid ID conflicts with users from the JSONPlaceholder service.

## Summary
The To-Do List project in Angular Material is a comprehensive application for task management, built on Angular technology and the Angular Material library. With a responsive user interface, drag-and-drop task functionality, and intuitive editing, adding, and deleting features, users can effectively manage their task lists on both desktop and mobile devices.
