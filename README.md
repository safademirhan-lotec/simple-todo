# My TODO App

A simple command-line TODO app in Node.js that allows you to manage tasks in a JSON file.


## Features

- Add a task
- List all tasks
- Mark a task as done
- Mark a task as undone
- List all done tasks
- List all undone tasks
- Delete a task
- Update a task description


`mytodo.js`: CLI app implemented in Javascript.

`todos.json`: File that contains TODO items.

## Steps to Follow

### How to Assign Todos To Someone
Set the TODO_USERNAME environment variable. You can do this in your shell with the following command
`export TODO_USERNAME="Safa Demirhan"`

### Make the script file executable
Make the mytodo.js file executable by running the following command in your shell

### Make your command work with one word, just like any other command 
In package.json, add the line: 
`"bin":{
    "mytodo": "mytodo.js"
  }`