const fs = require('fs');
const readline = require('readline');
const process = require('process');

const TODO_FILENAME = 'todos.json';
const TODO_USERNAME = process.env.TODO_USERNAME || 'Unknown';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function loadTodos() {
  try {
    const data = fs.readFileSync(TODO_FILENAME, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(TODO_FILENAME, JSON.stringify(todos), 'utf8');
}

function addTodo(title) {
  const todos = loadTodos();
  const newTodo = {
    id: todos.length + 1,
    title,
    asignee: TODO_USERNAME,
    done: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  console.log(`Added TODO: "${title}"`);
}

function listTodos(options) {
  const todos = loadTodos();
  if (options.done !== undefined) {
    const filteredTodos = todos.filter((todo) => todo.done === options.done);
    printTodos(filteredTodos);
  } else {
    printTodos(todos);
  }
}

function printTodos(todos) {
  if (todos.length === 0) {
    console.log('No TODOs found.');
  } else {
    todos.forEach((todo) => {
      const status = todo.done ? 'Done' : 'Undone';
      console.log(`[${todo.id}] ${status}: ${todo.title} (Assigned to: ${todo.asignee})`);
    });
  }
}

function markTodoDone(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = true;
    saveTodos(todos);
    console.log(`Marked TODO ${id} as done.`);
  } else {
    console.log(`TODO ${id} not found.`);
  }
}

function markTodoUndone(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = false;
    saveTodos(todos);
    console.log(`Marked TODO ${id} as undone.`);
  } else {
    console.log(`TODO ${id} not found.`);
  }
}

function deleteTodo(id) {
  const todos = loadTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    saveTodos(todos);
    console.log(`Deleted TODO ${id}: ${deletedTodo[0].title}`);
  } else {
    console.log(`TODO ${id} not found.`);
  }
}

function updateTodo(id, newTitle) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.title = newTitle;
    saveTodos(todos);
    console.log(`Updated TODO ${id}: "${newTitle}"`);
  } else {
    console.log(`TODO ${id} not found.`);
  }
}

function main() {
  const [command, ...args] = process.argv.slice(2);

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
      console.log('  mytodo add "A sample task description"');
      console.log('  mytodo list all');
      console.log('  mytodo done 1');
      console.log('  mytodo undone 1');
      console.log('  mytodo list --done');
      console.log('  mytodo list --undone');
      console.log('  mytodo delete 1');
      console.log('  mytodo update 1 "A new task description"');
  }

  rl.close();
}

main();
