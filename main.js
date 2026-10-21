const tasks = [];

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

    form.reset();
    renderTasks();
});

function renderTasks() {
    const tasksContainer = document.querySelector('#task-list');
    tasksContainer.innerHTML = '';
    
    tasks.forEach((task) => {
        const taskHTML = `
        <div class="task-card">
            <span class="task-card__category">${task.category[0].toUpperCase() + task.category.slice(1)}</span>
            <h3 class="task-card__name">${task.name[0].toUpperCase() + task.name.slice(1)}</h3>
            <p class="task-card__description">${task.description ? task.description[0].toUpperCase() + task.description.slice(1) : "No description"}</p>
            <span class="task-card__date">Date: ${task.date ? task.date : "Not provided"}</span>
        </div>
        `

        tasksContainer.innerHTML += taskHTML;
    });
}
