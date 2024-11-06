const newTask = document.getElementById('new-task-title');
const newTaskDescription = document.getElementById('new-task-description');
const newTaskPriority = document.getElementById('new-task-priority');
const createTaskButton = document.querySelector('.AddTask');

const createTask = async (e) => {
    e.preventDefault();
    const title = newTask.value;
    const description = newTaskDescription.value;
    const priority = newTaskPriority.value;

    console.log(title, description, priority);
    try {
        const response = await fetch('/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, priority })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Optionally, you can clear the input fields or update the UI here
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

createTaskButton.addEventListener('click', createTask);

