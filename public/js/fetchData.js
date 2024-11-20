const todayTotal = document.querySelector('.total');
const todayPendingTasks = document.querySelector('.pending');
const todayCompletedTasks = document.querySelector('.completed');


async function fetchData() {
    try {
        console.log('fetching data');
        
        const response = await fetch('/api/stats', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
            
        })  
        console.log('here');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);  

        return data;

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchData().then((data) => {
    console.log("check" + data);
    todayTotal.innerHTML = `Total Tasks : ${data.total}`;
    todayPendingTasks.innerHTML = `Pending Tasks : ${data.pending}`;
    todayCompletedTasks.innerHTML =`Completed Tasks : ${data.completed}`;
}).catch((error) => {
    console.error('Error:', error);
});

const fetchWeekdays = async() =>{
    try {
        const response = await fetch('/api/stats/weekdays' , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(!response.ok){
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        return data; 
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchWeekdays().then((data) => {
    console.log(data);
    const container = document.querySelector('.week-container');
    const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    data.forEach((day , index)=> {
        const div = document.createElement('div');
        div.classList.add('weekdays');
        div.classList.add(`${weekdays[index]}`);
        div.innerHTML=`<h3>${weekdays[index].charAt(0).toUpperCase() + weekdays[index].slice(1)}</h3>
                     <br> Total Tasks : ${day.totalTasks} <br> Completed Tasks : ${day.completedTasks}`;
        container.appendChild(div);
    })  

}).catch((error) => {
    console.error('Error:', error);
})