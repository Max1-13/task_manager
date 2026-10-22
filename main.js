let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const formTaskName = formData.get('name');
    const formTaskCategory = formData.get('category');
    const formTaskDescription = formData.get('description');
    const formTaskDate = formData.get('date');

    const newTask = {
        id: Date.now(),
        name: formTaskName,
        category: formTaskCategory,
        description: formTaskDescription,
        date: formTaskDate
    }

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    form.reset();
    renderTasks();
});

function renderTasks() {
    const tasksContainer = document.querySelector('#task-list');
    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks available</p>';
    } else {
        tasksContainer.innerHTML = '';
    
        tasks.forEach((task) => {
            const taskHTML = `
            <div class="task-card">
                <span class="task-card__category">${task.category[0].toUpperCase() + task.category.slice(1)}</span>
                <h3 class="task-card__name">${task.name[0].toUpperCase() + task.name.slice(1)}</h3>
                <p class="task-card__description">${task.description ? task.description[0].toUpperCase() + task.description.slice(1) : "No description"}</p>
                <span class="task-card__date">Date: ${task.date ? task.date : "Not provided"}</span>
                <button class="task-card__delete-btn" type="button" onclick="deleteTask(${task.id})">Delete</button>
            </div>
            `

            tasksContainer.innerHTML += taskHTML;
        });
    }
    
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
}

