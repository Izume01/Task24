const taskContainer = document.querySelector('.list-task');
const taskInformation = document.querySelector('.task-info');

const editTitle = document.querySelector('.Edit-title');
const editDescription = document.querySelector('.Edit-description');
const editPriority = document.querySelector('.Edit-priority');
const editTaskBtn = document.querySelector('.Save-Task');

// Fetch tasks from the server
const fetchTask = async () => {
    try {
        const response = await fetch('/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

// Display tasks
const displaytask = async () => {
    const tasks = await fetchTask();
    tasks.forEach(task => {
        const taskElem = document.createElement('div');
        taskElem.classList.add('task-display');
        taskElem.setAttribute('data-id', task._id);
        taskElem.innerHTML = `
          <input type="checkbox" name="task-check" class="task-check" ${task.Checked ? 'checked' : ''}>
          <div class="task-title">${task.title}</div>
        `;
        taskContainer.appendChild(taskElem);
    });
    handleTaskClick();
};

// Handle task click and show task details
const handleTaskClick = () => {
    const tasks = document.querySelectorAll('.task-display');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.task-check');
        const id = task.getAttribute('data-id');
        
        checkbox.addEventListener('change', () => {
            toggleTaskStatus(id, checkbox); // Call toggle function here
        });

        task.addEventListener('click', async () => {
            try {
                const response = await fetch(`/task/getTask/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch task details");

                const data = await response.json();
                updateData(data[0]);

                editTaskBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    if (!id) {
                        console.error("No task selected for editing");
                        return;
                    }
                    editTaskDetails(id);
                });
            } catch (error) {
                console.error("Error fetching task details:", error);
            }
        });
    });
};

// Toggle Task Status: Update task completion status when checkbox is clicked
const toggleTaskStatus = async (taskId, checkbox) => {
    const updatedTask = {
        Checked: checkbox.checked // Toggle the checked state
    };

    try {
        const response = await fetch(`/tasks/${taskId}/toggle`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        });
        if (!response.ok) throw new Error("Failed to update task status");

        const data = await response.json();
        console.log('Task status updated:', data);
    } catch (error) {
        console.error("Error updating task status:", error);
    }
};

// Update task details in the UI
const updateData = (data) => {
    if (!data) {
        console.error("No data received for update");
        return;
    }
    
    const dateObj = new Date(data.createdAt);
    const date = isNaN(dateObj) ? "Invalid Date" : dateObj.toLocaleDateString();
    const time = isNaN(dateObj) ? "Invalid Date" : dateObj.toLocaleTimeString();

    const taskinfotitle = document.querySelector('.task-info-title');
    const taskinfodescription = document.querySelector('.task-info-description');
    const taskinfodate = document.querySelector('.task-info-date');
    const taskinfotime = document.querySelector('.task-info-time');
    const taskinfostatus = document.querySelector('.task-info-status');

    taskinfotitle.textContent = `Task : ${data.title || "Undefined Title"}`;
    taskinfodescription.textContent = `Description : ${data.description || "Undefined Description"}`;
    taskinfodate.textContent = `Date : ${date}`;
    taskinfotime.textContent = `Time : ${time}`;
    taskinfostatus.textContent = `Status : ${data.priority || "Undefined Status"}`;

    taskInformation.setAttribute('data-id', data._id);
};

// Deletion
const deleteTask = async(id) => {
    try {
        const response = await fetch(`/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) throw new Error("Failed to delete task");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

const deleteTaskButton = document.querySelector('.deleteTask');

deleteTaskButton.addEventListener('click', async () => {
    const id = taskInformation.getAttribute('data-id');
    if (!id) {
        console.error("No task selected for deletion");
        return;
    }
    await deleteTask(id);
    location.reload();
});

// Edit Task
async function editTaskDetails(id) {
    const updatedTask = {
        title: editTitle.value,
        description: editDescription.value,
        priority: editPriority.value
    };
    try {
        const response = await fetch(`/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
        if (!response.ok) throw new Error("Failed to update task");
        const result = await response.json();
        console.log(result);
        location.reload();
    } catch (error) {
        console.error("Error details:", error);
    }
}

displaytask();
