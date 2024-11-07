// Get the elements
const createTask = document.querySelector('.createTask')
const overlay = document.getElementById('overlay');
const closeOverlayBtn = document.getElementById('closeOverlayBtn');

createTask.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

// Function to hide the overlay
closeOverlayBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Close overlay if clicked outside the content
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
});
