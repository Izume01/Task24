// Get DOM elements
const editOverlay = document.getElementById('editOverlay');
const closeEditOverlayBtn = document.getElementById('closeEditOverlayBtn');
const editTaskButtons = document.querySelectorAll('.editTask');
const editTaskForm = document.querySelector('.editTaskForm');

editTaskButtons.forEach(button => {
    button.addEventListener('click', () => {
        editOverlay.style.display = 'flex';
    });
});

closeEditOverlayBtn.addEventListener('click', () => {
    editOverlay.style.display = 'none';
    editTaskForm.reset();
});

// Close overlay if clicked outside
editOverlay.addEventListener('click', (event) => {
    if (event.target === editOverlay) {
        editOverlay.style.display = 'none';
        editTaskForm.reset();
    }
});

// Handle form submission
editTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editOverlay.style.display = 'none';
    editTaskForm.reset();
});
