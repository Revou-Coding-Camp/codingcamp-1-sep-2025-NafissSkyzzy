let todoList = [];
let sortAsc = true; // toggle urutan ascending/descending

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}


function validateInput(input) {
    const todoInput = document.getElementById('todo-input').value;
    const todoDateInput = document.getElementById('todo-date-input').value;

    if (todoInput === '' || todoDateInput === '') {
        alert('Please fill in both the task and due date.');
    } else {
        addTodo(todoInput, todoDateInput);
        document.getElementById("todo-input").value = "";
        document.getElementById("todo-date-input").value = "";
    }
}

function addTodo(task, dueDate) {
    const todoItem = {
        task: task,
        dueDate: dueDate,
        completed: false
    };

    todoList.push(todoItem);
    renderTodoList();
}

function deleteAllTodo() {
    todoList = [];
    renderTodoList();
}

// Toggle status (done/pending)
function toggleStatus(index) {
  todoList[index].completed = !todoList[index].completed;
  renderTodoList();
}

// Hapus task tertentu
function deleteTodo(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

// Tombol "Filter Task" di HTML → sebenarnya untuk sort by date
function filterTodo() {
  const arrow = document.getElementById("sort-arrow");

  if (sortAsc) {
    // Ascending
    todoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    arrow.innerText = "↑";
  } else {
    // Descending
    todoList.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    arrow.innerText = "↓";
  }

  renderTodoList();
  sortAsc = !sortAsc;
}


function renderTodoList() {
  const todoListContainer = document.getElementById('todo-list');
  todoListContainer.innerHTML = '';

  if (todoList.length === 0) {
    todoListContainer.innerHTML = '<tr><td colspan="4" class="p-2">No Task Added Yet</td></tr>';
    
    // Tetap tambahkan dummy row biar tabel fix tinggi
  for (let i = 1; i < 6; i++) {
    todoListContainer.innerHTML += `
      <tr>
        <td class="p-2">&nbsp;</td>
        <td class="p-2"></td>
        <td class="p-2"></td>
        <td class="p-2"></td>
      </tr>
    `;
  }
    
    return;
  } else {

  todoList.forEach((item, index) => {
    const statusText = item.completed ? 'Done' : 'Pending';
    const statusClass = item.completed ? 'text-green-600 font-semibold' : 'text-yellow-500 font-medium';

    todoListContainer.innerHTML += `
      <tr class="hover:bg-blue-50 transition-colors">
        <td class="p-2">${item.task}</td>
        <td class="p-2">${formatDate(item.dueDate)}</td>
        <td class="p-2 ${statusClass}">${statusText}</td>
        <td class="p-2">
          <button onclick="toggleStatus(${index})" class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow">✅</button>
          <button onclick="deleteTodo(${index})" class="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-full shadow">🗑️</button>
        </td>
      </tr>
    `;
  });

    // Tambahkan dummy row supaya tabel minimal 5 baris
  if (todoList.length < 6) {
    const remaining = 6 - todoList.length;
    for (let i = 0; i < remaining; i++) {
      todoListContainer.innerHTML += `
        <tr>
          <td class="p-2">&nbsp;</td>
          <td class="p-2"></td>
          <td class="p-2"></td>
          <td class="p-2"></td>
        </tr>`;
    }
  }
    }
}

// Render tabel pertama kali saat halaman load
document.addEventListener("DOMContentLoaded", () => {
  renderTodoList();
});

