const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// 提交表單時新增任務
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === '') return;
  createTaskElement(taskText);
  input.value = '';
  saveTasks();
});

// 建立任務元素
function createTaskElement(taskText, isCompleted = false) {
  const li = document.createElement('li');
  if (isCompleted) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.classList.add('delete-btn');

  deleteBtn.addEventListener('click', function () {
    li.remove();
    saveTasks();
  });

  li.addEventListener('click', function (e) {
    if (e.target !== deleteBtn) {
      li.classList.toggle('completed');
      saveTasks();
    }
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// 儲存到 localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const isCompleted = li.classList.contains('completed');
    tasks.push({ taskText: text, isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 載入 localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    createTaskElement(task.taskText, task.isCompleted);
  });
}

window.addEventListener('load', loadTasks);