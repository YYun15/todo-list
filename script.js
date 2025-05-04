const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  // 刪除按鈕
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.addEventListener('click', function () {
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);

  // 點擊切換完成狀態
  li.addEventListener('click', function (e) {
    if (e.target !== deleteBtn) {
      li.classList.toggle('completed');
      saveTasks();
    }
  });

  taskList.appendChild(li);
  input.value = '';
  saveTasks();
});