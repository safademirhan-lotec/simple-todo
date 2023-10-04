#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const process = require('process');

const TODO_FILENAME = path.join(__dirname, './todos.txt');
const TODO_USERNAME = process.env.TODO_USERNAME || 'Unknown';

// load todos added before to re-write the file
function loadTodos() {
  try {
    const data = fs.readFileSync(TODO_FILENAME, 'utf8');
    const lines = data.split('\n').filter(Boolean);
    return lines.map((line) => JSON.parse(line));
  } catch (err) {
    return [];
  }
}

// replace the file with the updated version
function saveTodos() {
  const data = todos.map((todo) => JSON.stringify(todo)).join('\n');
  fs.writeFileSync(TODO_FILENAME, data, 'utf8');
}

function addTodo(title) {
  const newTodo = {
    id: Math.floor(1000 + Math.random() * 9000),
    title,
    asignee: TODO_USERNAME,
    done: false,
  };
  fs.appendFileSync(TODO_FILENAME, JSON.stringify(newTodo) + '\n', 'utf8');
  console.log(`Added TODO: "${title}"`);
}

// list todos with or without options (options: done/undone)
function listTodos(options) {
  if (options.done !== undefined) {
    const filteredTodos = todos.filter((todo) => todo.done === options.done);
    printTodos(filteredTodos);
  } else {
    printTodos(todos);
  }
}

// utility function for listTodos(options)
function printTodos(todos) {
  if (todos.length === 0) {
    console.log('No TODOs found.');
  } else {
    todos.forEach((todo) => {
      const status = todo.done ? 'Done' : 'Undone';
      console.log(
        `[${todo.id}] ${status}: ${todo.title} (Assigned to: ${todo.asignee})`,
      );
    });
  }
}

// mark the todo done by searching the array with the id property
function markTodoDone(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = true;
    saveTodos();
    console.log(`Marked TODO ${id} as done.`);
  } else {
    console.log(`TODO ${id} not found.`);
  }
}

// mark the todo undone by searching the array with the id property
function markTodoUndone(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = false;
    saveTodos();
    console.log(`Marked TODO ${id} as undone.`);
  } else {
    console.log(`TODO ${id} not found.`);
  }
}

// delete the todo by searching the array with the id property
function deleteTodo(id) {
  const todos = loadTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    saveTodos();
    console.log(`Deleted TODO ${id}: ${deletedTodo[0].title}`);
  } else {
    console.log(`TODO ${id} not found.`);
  }
}

// update the todo by searching the array with the id property
function updateTodo(id, newTitle) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.title = newTitle;
    saveTodos();
    console.log(`Updated TODO ${id}: "${newTitle}"`);
  } else {
    console.log(`TODO ${id} not found.`);
  }
}

function main() {
  const [command, ...args] = process.argv.slice(2);

  // list all todos when no argument is given by the user
  if (!command) {
    listTodos({});
    return;
  }

  switch (command) {
    case 'add':
      addTodo(args.join(' '));
      break;
    case 'list':
      const options = {};
      if (args.includes('--done')) {
        options.done = true;
      }
      if (args.includes('--undone')) {
        options.done = false;
      }
      listTodos(options);
      break;
    case 'done':
      markTodoDone(parseInt(args[0]));
      break;
    case 'undone':
      markTodoUndone(parseInt(args[0]));
      break;
    case 'delete':
      deleteTodo(parseInt(args[0]));
      break;
    case 'update':
      updateTodo(parseInt(args[0]), args.slice(1).join(' '));
      break;
    default:
      console.log('Invalid command. Usage:');
      console.log(' mytodo add "A sample task description"');
      console.log(' mytodo list all');
      console.log(' mytodo done 1');
      console.log(' mytodo undone 1');
      console.log(' mytodo list --done');
      console.log(' mytodo list --undone');
      console.log(' mytodo delete 1');
      console.log(' mytodo update 1 "A new task description"');
  }
}

main();
