const title = document.querySelector('.Create-title');
const description = document.querySelector('.Create-description');
const priority = document.querySelector('.Create-priority');

const createTaskBtn = document.querySelector('.Create-Task')

createTaskBtn.addEventListener('click', async ()=> {
    const task = {
        title: title.value,
        description: description.value,
        priority: priority.value
    }

    const response =await fetch('/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    if (!response.ok) throw new Error("Failed to create task");
    const data = await response.json();
    console.log(data);
    window.location.reload();
})