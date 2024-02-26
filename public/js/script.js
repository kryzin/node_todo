document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();

    document.getElementById('taskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });
});

function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.title; // Simplified display, add more details as needed
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = { title: taskInput.value, description: '', priority: 'Low', status: 'pending' };
    taskInput.value = '';
    
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(response => {
        if (response.ok) {
            fetchTasks(); // Refresh the list
        }
    })
    .catch(error => console.error('Error adding task:', error));

    taskInput.value = ''; // Clear the input after adding
}
