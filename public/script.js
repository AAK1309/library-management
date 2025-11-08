const token = localStorage.getItem('token');
const bookForm = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const logoutBtn = document.getElementById('logoutBtn');

// 🟢 Fetch all books
async function loadBooks() {
  const res = await fetch('http://localhost:5000/api/books');
  const books = await res.json();
  bookList.innerHTML = '';

  books.forEach(book => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} (${book.genre})
      <button onclick="deleteBook('${book._id}')">🗑 Delete</button>
    `;
    bookList.appendChild(li);
  });
}

// 🟢 Add new book
bookForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const genre = document.getElementById('genre').value.trim();

  const res = await fetch('http://localhost:5000/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, genre })
  });

  if (res.ok) {
    alert('✅ Book added successfully!');
    bookForm.reset();
    loadBooks();
  } else {
    alert('❌ Failed to add book.');
  }
});

// 🟢 Delete book
async function deleteBook(id) {
  if (confirm('Are you sure you want to delete this book?')) {
    const res = await fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      alert('🗑 Book deleted!');
      loadBooks();
    } else {
      alert('❌ Failed to delete book.');
    }
  }
}

// 🟢 Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

loadBooks();
