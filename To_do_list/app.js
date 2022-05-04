const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);


//create todo
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div'); //create a todo div
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li'); //create li
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);            //add todos to local storage

    const completedButton = document.createElement('button');  //checked button
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');  //checked delete button
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);  //append to list

    todoInput.value = ''; /// clear the value after entering newtodo
}


function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === 'trash-btn') {    //delete todos
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {  //waits and executes after the animation is completed
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-btn') {  //toggle completed
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


function saveLocalTodos(todo) {
    let todos;                                          //check if there is anything in storage
    if (localStorage.getItem('todos') === null) {
        todos = [];                                     //if nothing, create an empty array
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));  //else get the todos from local storage, as an array
    }
    todos.push(todo);                                        //push the todo in the array   
    localStorage.setItem('todos', JSON.stringify(todos));       //send it back to local storage
}

function getTodos() {
    let todos;                                          //check if there is anything in storage
    if (localStorage.getItem('todos') === null) {
        todos = [];                                     //if nothing, create an empty array
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));  //else get the todos from local storage, as an array
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div'); //create a todo div
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li'); //create li
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');  //checked button
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');  //checked delete button
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);  //append to list
    })
}

function removeLocalTodos(todo) {
    let todos;                                          //==========================
    if (localStorage.getItem('todos') === null) {
        todos = [];                                     //grab this and all the above as one function
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //  ================
    }
    const todoIndex = todo.children[0].innerText;   //grab the index of todo
    todos.splice(todos.indexOf(todoIndex), 1);      //remove said todo
    localStorage.setItem('todos', JSON.stringify(todos));
}