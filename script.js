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
    li.setAttribute('draggable', 'true'); // 拖曳開啟
  
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
  
    // 拖曳功能開始
    li.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', null); // Firefox 需要
      li.classList.add('dragging');
    });
  
    li.addEventListener('dragend', () => {
      li.classList.remove('dragging');
      saveTasks(); // 拖曳結束後儲存
    });
  
    li.addEventListener('dragover', e => e.preventDefault());
  
    li.addEventListener('drop', e => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      if (dragging && dragging !== li) {
        const bounding = li.getBoundingClientRect();
        const offset = e.clientY - bounding.top;
        const midpoint = bounding.height / 2;
        if (offset > midpoint) {
          li.after(dragging);
        } else {
          li.before(dragging);
        }
      }
    });
    // 拖曳功能結束
  
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

// 過濾任務
const filterSelect = document.getElementById('filter-select');

filterSelect.addEventListener('change', function () {
  filterTasks(this.value);
});

function filterTasks(filter) {
  const tasks = document.querySelectorAll('#task-list li');
  tasks.forEach(task => {
    const isCompleted = task.classList.contains('completed');
    if (filter === 'all') {
      task.style.display = '';
    } else if (filter === 'completed') {
      task.style.display = isCompleted ? '' : 'none';
    } else if (filter === 'uncompleted') {
      task.style.display = !isCompleted ? '' : 'none';
    }
  });
}