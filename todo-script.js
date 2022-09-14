const addTaskInput = document.getElementById('add-input');
const addTaskBtn = document.getElementById('add-task');
const tasksShow = document.querySelector('.task-list');
// const = document.querySelector('.task-list');
const selectTasks = document.querySelector('.filter-todo'); 

let accumulationTasks;
!localStorage.accumulationTasks ? accumulationTasks = [] : accumulationTasks = JSON.parse(localStorage.getItem('accumulationTasks'));

let taskListElement = [];

function Task(frominput) {
    this.frominput = frominput;
    this.complited = false;
};

addTaskBtn.addEventListener('click', () => {
    if(addTaskInput.value == '') {
        alert("Empty value are not allowed");
    } else {
        accumulationTasks.push(new Task(addTaskInput.value));
        pushLocStorage();
        fillTasksShow();
        addTaskInput.value = '';
    }
});

selectTasks.addEventListener('click', function filterTodo(e) {
    const todos = tasksShow.childNodes;
    // console.log(todos)
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'Completed':
                // if (todo.classList.contains("checked")) {
                //     todo.style.display = "flex";
                //   } else {
                //     todo.style.display = "none";
                //   }
                console.log(todo);
                break;
        }
    })
});

const createTemplate = (task, index) => {
    return `
        
        <li class="description-task ${task.complited ? 'checked' : ''}">${task.frominput}
            <div class="buttons">
                <input onclick="complitedTask(${index})" class="btn-coplite" type="checkbox" ${task.complited ? 'checked' : ''}> 
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </li>
    `
};

const filterTasks = () => {
    const activeUpTasks = accumulationTasks.length && accumulationTasks.filter(item => item.complited == false);
    const unactiveDownTasks = accumulationTasks.length && accumulationTasks.filter(item => item.complited == true) ;
    accumulationTasks = [...activeUpTasks, ...unactiveDownTasks]
}

const fillTasksShow = () => {
    tasksShow.innerHTML = "";
    if(accumulationTasks.length > 0) {
        filterTasks();
        accumulationTasks.forEach((item, index) => {
            tasksShow.innerHTML += createTemplate(item, index);
        });
        taskListElement = document.querySelectorAll('.description-task');
    }
};

fillTasksShow();

const pushLocStorage = () => {
    localStorage.setItem('accumulationTasks', JSON.stringify(accumulationTasks))
};

const complitedTask = index => {
    accumulationTasks[index].complited = !accumulationTasks[index].complited;
    if(accumulationTasks[index].complited) {
        taskListElement[index].classList.add('checked') ;
    } else {
        taskListElement[index].classList.remove('checked') ;
    }
    
    pushLocStorage();
    fillTasksShow();
};

const deleteTask = index => {
    taskListElement[index].classList.add('delition');
    setTimeout( () => {
        accumulationTasks.splice(index, 1);
        pushLocStorage();
        fillTasksShow();
    }, 500);
};