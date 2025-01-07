document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: taskText }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);

        const li = document.createElement('li');
        li.textContent = taskText;
        document.getElementById('task-list').appendChild(li);

        taskInput.value = '';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

window.addEventListener('load', () => {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task;
                taskList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});