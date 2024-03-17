function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    var deadlineInput = document.getElementById("deadlineInput").value;
    var priorityInput = document.getElementById("priorityInput").value;

    if (taskInput === '') {
        alert("Please enter a task.");
        return;
    }

    var taskList = document.getElementById("taskList");
    var newTask = createTaskElement(taskInput, deadlineInput, priorityInput);

    // Find the correct position to insert the new task based on priority and deadline
    var inserted = false;
    var taskItems = taskList.querySelectorAll('.task-item');
    for (var i = 0; i < taskItems.length; i++) {
        var currentPriority = taskItems[i].querySelector('.task-priority').textContent.split(": ")[1];
        var currentDeadline = new Date(taskItems[i].querySelector('.task-deadline').textContent.split(": ")[1]);
        if ((priorityInput === 'high' && currentPriority !== 'high') ||
            (priorityInput === 'medium' && (currentPriority === 'low' || (currentPriority === 'medium' && currentDeadline > new Date(deadlineInput)))) ||
            (priorityInput === 'low' && currentPriority === 'low' && currentDeadline > new Date(deadlineInput))) {
            taskList.insertBefore(newTask, taskItems[i]);
            inserted = true;
            break;
        }
    }

    // If the new task hasn't been inserted yet, append it to the end of the list
    if (!inserted) {
        taskList.appendChild(newTask);
    }

    document.getElementById("taskInput").value = '';
    document.getElementById("deadlineInput").value = '';
}

function createTaskElement(taskInput, deadlineInput, priorityInput) {
    var taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = '<span class="task-content">' + taskInput + '</span><span class="task-deadline">Deadline: ' + deadlineInput + '</span><span class="task-priority">Priority: ' + priorityInput + '</span><button onclick="editTask(this)">Edit</button><button onclick="moveTaskUp(this)">Move Up</button><button onclick="moveTaskDown(this)">Move Down</button><button onclick="deleteTask(this)">Delete</button>';
    return taskItem;
}

function moveTaskUp(task) {
    var taskItem = task.parentNode;
    var previousTask = taskItem.previousElementSibling;
    if (previousTask) {
        taskItem.parentNode.insertBefore(taskItem, previousTask);
    }
}

function moveTaskDown(task) {
    var taskItem = task.parentNode;
    var nextTask = taskItem.nextElementSibling;
    if (nextTask) {
        taskItem.parentNode.insertBefore(nextTask, taskItem);
    }
}

function editTask(task) {
    var taskItem = task.parentNode;
    var taskContent = taskItem.querySelector('.task-content');
    var taskDeadline = taskItem.querySelector('.task-deadline');
    var taskPriority = taskItem.querySelector('.task-priority');

    var newTaskContent = prompt("Edit task:", taskContent.textContent);
    var newTaskDeadline = prompt("Edit deadline:", taskDeadline.textContent.split(": ")[1]);
    var newTaskPriority = prompt("Edit priority:", taskPriority.textContent.split(": ")[1]);

    if (newTaskContent !== null && newTaskDeadline !== null && newTaskPriority !== null) {
        taskContent.textContent = newTaskContent;
        taskDeadline.textContent = "Deadline: " + newTaskDeadline;
        taskPriority.textContent = "Priority: " + newTaskPriority;
    }
}

function deleteTask(task) {
    task.parentNode.remove();
}
