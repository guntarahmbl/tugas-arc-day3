const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const todoList = [];

let continueGettingInput = true;


function displayList() {
  console.log('Todo List:');
  todoList.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
}


function addItemCallback(item) {
  todoList.push(item);
  console.log(`Added: ${item}`);
  displayList();
}


async function addItemAsyncAwait(item) {
  return new Promise(resolve => {
    setTimeout(() => {
      addItemCallback(item);
      resolve();
    }, 1000); 
  });
}


function getUserInputCallback() {
  return new Promise(resolve => {
    rl.question('Enter an item for the todo list (press "q" to quit): ', function (userInput) {
      resolve(userInput);
    });
  });
}


async function getUserInputAsyncAwait() {
  const userInput = await getUserInputCallback();
  return userInput;
}

// Main function using async/await
async function main() {
  while (continueGettingInput) {
    const userInput = await getUserInputAsyncAwait(); 
    if (userInput.toLowerCase() === 'q') {
      continueGettingInput = false;
      rl.close();
    } else {
      await addItemAsyncAwait(userInput); 
    }
  }
}

rl.on('close', function () {
  console.log('Goodbye!');
  process.exit(0);
});


main();
