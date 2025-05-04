// 取得 HTML 元素
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// 當表單提交時執行的事件
form.addEventListener('submit', function (e) {
  e.preventDefault();  // 防止頁面重新整理
  const taskText = input.value.trim();  // 取得輸入框文字
  if (taskText === '') return;  // 如果輸入框為空，直接返回

  // 建立新的任務項目
  const li = document.createElement('li');
  li.textContent = taskText;

  // 新增刪除按鈕
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.addEventListener('click', function () {
    li.remove();
    saveTasks(); // 刪除後儲存變更
  });

  // 點擊任務切換完成狀態
  li.addEventListener('click', function (e) {
    if (e.target !== deleteBtn) {  // 避免點擊刪除按鈕時觸發切換
      li.classList.toggle('completed');
      saveTasks(); // 每次狀態變更都儲存
    }
  });

  li.appendChild(deleteBtn);  // 把刪除按鈕加到任務項目
  taskList.appendChild(li);  // 把任務項目加到清單

  input.value = '';  // 清空輸入框
  saveTasks(); // 儲存任務資料
});

// 儲存任務到 localStorage
function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll('#task-list li');
  
  taskItems.forEach(item => {
    const taskText = item.textContent.replace('✕', '').trim();  // 取得任務文字
    const isCompleted = item.classList.contains('completed');  // 判斷是否已完成
    tasks.push({ taskText, isCompleted });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));  // 儲存到 localStorage
}

// 從 localStorage 載入任務
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.taskText;

    // 如果該任務已完成，設置 class 為 completed
    if (task.isCompleted) {
      li.classList.add('completed');
    }

    // 新增刪除按鈕
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', function () {
      li.remove();
      saveTasks(); // 刪除後儲存變更
    });

    li.appendChild(deleteBtn);  // 把刪除按鈕加到任務項目
    taskList.appendChild(li);  // 把任務項目加到清單
  });
}

// 網頁載入時從 localStorage 載入任務
window.addEventListener('load', loadTasks);