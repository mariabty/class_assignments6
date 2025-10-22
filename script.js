// === Responsive Navbar ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


// === Image Gallery ===
const thumbnails = document.querySelectorAll('.thumbnails img');
const displayedImg = document.getElementById('emosagii');

thumbnails.forEach(img => {
  img.addEventListener('click', () => {
    displayedImg.src = img.src;
  });
});


// === Form Validation ===
const form = document.getElementById('contactForm');
const errorMsg = document.getElementById('error-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirm = document.getElementById('confirm').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !password || !confirm || !message) {
    errorMsg.textContent = "⚠️ Please fill in all fields.";
    errorMsg.style.color = "red";
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    errorMsg.textContent = "⚠️ Enter a valid email address.";
    errorMsg.style.color = "red";
    return;
  }

  if (password !== confirm) {
    errorMsg.textContent = "⚠️ Passwords do not match.";
    errorMsg.style.color = "red";
    return;
  }

  errorMsg.style.color = "green";
  errorMsg.textContent = "✅ Form submitted successfully!";
  form.reset();
});


// === Fade-In Scroll Animation ===
const fadeElems = document.querySelectorAll('.fade-in');

function checkFadeIn() {
  fadeElems.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);



// === TO-DO LIST (Local Storage) ===
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Add a new task
addBtn.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText, false);
  saveTask(taskText, false);
  todoInput.value = "";
});

// Create task element in the list
function createTaskElement(text, completed) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;

  const btnContainer = document.createElement('div');

  const completeBtn = document.createElement('button');
  completeBtn.textContent = "✔";
  completeBtn.classList.add('complete');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add('delete');

  btnContainer.appendChild(completeBtn);
  btnContainer.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(btnContainer);
  todoList.appendChild(li);

  // Mark as complete
  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  // Delete task
  deleteBtn.addEventListener('click', () => {
    li.remove();
    updateLocalStorage();
  });
}

// Save tasks to local storage
function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update local storage when tasks change
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
