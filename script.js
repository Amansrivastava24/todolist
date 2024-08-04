document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const filters = document.querySelectorAll('.filters button');
    const darkThemeButton = document.getElementById('dark-theme');
    let tasks = [];

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    filters.forEach(button => button.addEventListener('click', filterTasks));
    darkThemeButton.addEventListener('click', darkTheme);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    function handleTaskClick(event) {
        const target = event.target;
        const taskElement = target.closest('li');
        const taskIndex = [...taskList.children].indexOf(taskElement);

        if (target.tagName === 'BUTTON') {
            tasks.splice(taskIndex, 1);
        } else {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
        }
        renderTasks();
    }

    function filterTasks(event) {
        filters.forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');
        renderTasks();
    }

    function renderTasks() {
        const filter = document.querySelector('.filters button.active').dataset.filter;
        const filteredTasks = tasks.filter(task => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });

        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.textContent = task.text;
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            taskElement.appendChild(deleteButton);
            taskList.appendChild(taskElement);
        });
    }

    function darkTheme() {
        document.body.classList.toggle('dark-mode');
    }
});