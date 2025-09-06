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
      <tr>
        <td class="p-2">${item.task}</td>
        <td class="p-2">${formatDate(item.dueDate)}</td>
        <td class="p-2 ${statusClass}">${statusText}</td>
        <td class="p-2">
          <button onclick="toggleStatus(${index})" class="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 
         text-white p-1 rounded-full shadow"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M21.856 10.303c.086.554.144 1.118.144 1.697 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c2.347 0 4.518.741 6.304 1.993l-1.422 1.457c-1.408-.913-3.082-1.45-4.882-1.45-4.962 0-9 4.038-9 9s4.038 9 9 9c4.894 0 8.879-3.928 8.99-8.795l1.866-1.902zm-.952-8.136l-9.404 9.639-3.843-3.614-3.095 3.098 6.938 6.71 12.5-12.737-3.096-3.096z"/></svg></button>
          <button onclick="deleteTodo(${index})" class="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 
         text-white p-1 rounded-full shadow"><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z"/></svg></button>
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

// Buka kalender otomatis ketika user klik input
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("todo-date-input");

  dateInput.addEventListener("click", function () {
    this.showPicker(); // langsung munculin kalender
  });
});
