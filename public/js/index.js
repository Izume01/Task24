const taskContainer = document.querySelector('.list-task');
const taskInformation = document.querySelector('.task-info');

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

const displaytask = async () => {
    const tasks = await fetchTask();
    tasks.forEach(task => {
        const taskElem = document.createElement('div');
        taskElem.classList.add('task-display');
        taskElem.setAttribute('data-id', task._id);
        taskElem.innerHTML = `
          <input type="checkbox" name="task-check" class="task-check">
          <div class="task-title">${task.title}</div>
        `;
        taskContainer.appendChild(taskElem);
    });
    handleTaskClick();
};

const handleTaskClick = () => {
    const tasks = document.querySelectorAll('.task-display');
    tasks.forEach(task => {
        task.addEventListener('click', async () => {
            const id = task.getAttribute('data-id');
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
            } catch (error) {
                console.error("Error fetching task details:", error);
            }
        });
    });
};

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

    taskinfotitle.textContent = `Task : ${data.title || "Undefined Title"}`
    taskinfodescription.textContent = `Description : ${data.description || "Undefined Description"}`;
    taskinfodate.textContent = `Date : ${date}`;
    taskinfotime.textContent = `Time : ${time}`;
    taskinfostatus.textContent = `Status : ${data.priority || "Undefined Status"}`;

    taskInformation.setAttribute('data-id', data._id);
};

displaytask();


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
}

const deleteTaskButton = document.querySelector('.deleteTask');

deleteTaskButton.addEventListener('click' , async()=> {
    const id = taskInformation.getAttribute('data-id');
    if(!id)
    {
        console.error("No task selected for deletion");
        return;
    }
    await deleteTask(id);
    location.reload();
})