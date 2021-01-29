const form = document.querySelector('form')
const list = document.querySelector('.todo-list');
const input = document.querySelector('.add-items-input');
const trash = document.querySelector('i')
const reset = document.querySelector('.btn-reset');
var allTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
localStorage.setItem('tasks', JSON.stringify(allTasks))
var data = JSON.parse(localStorage.getItem('tasks'));
// document.querySelector('li').addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log(e);
//     e.target.closest('.todo-list-element').remove();
//     allTasks.splice(e.target.closest('.todo-list-element').children[0].innerHTML, 1)
//     localStorage.setItem('tasks', JSON.stringify(allTasks));
// })

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value != '') {
        allTasks.push(input.value);
        createTask(input.value);
        localStorage.setItem('tasks', JSON.stringify(allTasks))
        input.value = '';
    }
    else {
        alert('fill input!')
    }
})
function createTask(task) {
    var newElement = document.createElement('li');
    newElement.className = 'todo-list-element';
    newElement.innerHTML = '<span class="todo-list-element-title"></span><a href="#!" class="todo-list-element-trash"><i class="fa fa-trash"></i></a>';
    list.appendChild(newElement);
    newElement.querySelector('.todo-list-element-title').innerHTML = task;
}

data.forEach(task => {
    createTask(task);
});

list.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('todo-list-element-trash')) {
        allTasks.forEach((element, index) => {
            if (element == e.target.closest('.todo-list-element').children[0].innerHTML) {
                allTasks.splice(index, 1)
            }
        });
        console.log(allTasks);
        localStorage.setItem('tasks', JSON.stringify(allTasks))
        e.target.parentElement.parentElement.remove();
    }
})


reset.addEventListener('click', (e) => {
    localStorage.clear();
    allTasks = [];
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
})
