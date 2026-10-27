let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

// theme toggle

const toggleBtn = document.querySelector("#theme-toggle");

if (localStorage.getItem('theme') === "dark") {
    document.body.classList.add('dark-theme');
}

toggleBtn.addEventListener('click', () => {

    if (document.body.classList.toggle('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
})

// form saving

const form = document.querySelector('.form');

form.addEventListener('input', () => {
    
    const draft = {
        taskName: document.querySelector('#task-name').value,
        taskCategory: document.querySelector('#task-category').value,
        taskDescription: document.querySelector('#task-description').value,
        taskDate: document.querySelector('#task-date').value
    };

    localStorage.setItem('draft', JSON.stringify(draft));
})

// retriving saved form data

const savedDraft = localStorage.getItem('draft');

if(savedDraft) {
    const parsedDraft = JSON.parse(savedDraft);

    document.querySelector('#task-name').value = parsedDraft.taskName;
    document.querySelector('#task-category').value = parsedDraft.taskCategory;
    document.querySelector('#task-description').value = parsedDraft.taskDescription;
    document.querySelector('#task-date').value = parsedDraft.taskDate;
}

// getting form data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const formTaskName = formData.get('name').trim();
    const formTaskCategory = formData.get('category');
    const formTaskDescription = formData.get('description');
    const formTaskDate = formData.get('date');

    const newTask = {
        id: Date.now(),
        name: formTaskName,
        category: formTaskCategory,
        description: formTaskDescription,
        status: "In progress",
        date: formTaskDate
    }

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    form.reset();
    localStorage.removeItem('draft');
    renderTasks();
});

// render task

function renderTasks() {
    const tasksContainer = document.querySelector('#task-list');
    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks available</p>';
    } else {
        tasksContainer.innerHTML = '';
    
        tasks.forEach((task) => {

            const taskHTML = `
            <div class="task-card">

                <div class="task-card-top">
                    <div class="task-card-top__tag-container">
                        <span class="task-card-top__tag-container--progress ${task.status === 'Done' ? 'tag-container--done' : ''}">${task.status}</span>
                        <span class="task-card-top__tag-container--category">${task.category[0].toUpperCase() + task.category.slice(1)}</span>
                    </div>
                    <div class="task-card-top__options-container">
                        <button type="button" class="options-container__btn" onclick="toggleDropdown(this)"><i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul class="options-container__dropdown">
                            <li><button type="button" class="dropdown--status" onclick="changeStatus(${task.id})">Change status</button></li>
                            <li><button type="button" class="dropdown--delete-btn" onclick="deleteTask(${task.id})">Delete</button></li>
                        </ul>
                    </div>
                </div>

                <div class="task-card-middle">
                    <h3 class="task-card-middle__name">${task.name[0].toUpperCase() + task.name.slice(1)}</h3>
                    <p class="task-card-middle__description">${task.description ? task.description[0].toUpperCase() + task.description.slice(1) : "No description"}</p>
                </div>
                
                <div class="task-card-bottom">
                    <hr class="task-card-bottom__line">
                    <span class="task-card-bottom__date">${task.date ? task.date : "Date was not provided"}</span>
                </div>
            </div>
            `

            tasksContainer.innerHTML += taskHTML;
        });
    }
    
}

// opening options for task card

function toggleDropdown(clickedButton) {

    const parent = clickedButton.parentElement;
    
    const dropdown = parent.querySelector('.options-container__dropdown');
    
    dropdown.classList.toggle('show-dropdown');
}

// change status

function changeStatus(id) {

    const targetedTask = tasks.find(task => task.id === id);

    if (targetedTask.status === "In progress") {

        targetedTask.status = "Done";
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    } else {
        targetedTask.status = "In progress";
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// delete task

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
}

