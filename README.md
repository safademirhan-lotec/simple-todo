# My TODO App

A simple command-line TODO app in Node.js that allows you to manage tasks in a JSON file.

## Features

- Add a task: `mytodo add "A sample task description"`
- List all tasks: `mytodo list` and `mytodo`
- Mark a task as done: `mytodo done 1`
- Mark a task as undone: `mytodo undone 1`
- List all done tasks: `mytodo list --done`
- List all undone tasks: `mytodo list --undone`
- Delete a task: `mytodo delete 1`
- Update a task description: `mytodo update 1 "A new task description"`

`mytodo.js`: CLI app implemented in Javascript.

`todos.json`: File that contains TODO items.

## Steps to Follow

### How to Assign Todos To Someone

Set the TODO_USERNAME environment variable. You can do this in your shell with the following command
`export TODO_USERNAME="Safa Demirhan"`

### Make the script file executable

Make the mytodo.js file executable by running the following command in your shell
`chmod +x mytodo.js`

### Make your command work with one word, just like any other command

In package.json, add the line:
`"bin":{
    "mytodo": "mytodo.js"
  }`
