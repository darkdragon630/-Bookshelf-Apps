document.addEventListener('DOMContentLoaded', function() {
  const addBookButton = document.getElementById('addBookButton');
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');
  const yearInput = document.getElementById('yearInput');
  const isCompleteInput = document.getElementById('isCompleteInput');
  const unfinishedBooksList = document.getElementById('unfinishedBooks');
  const finishedBooksList = document.getElementById('finishedBooks');

  // Load books from localStorage on page load
  let books = JSON.parse(localStorage.getItem('books')) || [];

  // Render books based on their completion status
  function renderBooks() {
    unfinishedBooksList.innerHTML = '';
    finishedBooksList.innerHTML = '';

    books.forEach(book => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${book.title}</strong> (${book.year}) - ${book.author}
        <button class="delete-btn" data-id="${book.id}">Hapus</button>
      `;
      
      const deleteButton = li.querySelector('.delete-btn');
      deleteButton.addEventListener('click', function() {
        deleteBook(book.id);
      });

      if (book.isComplete) {
        finishedBooksList.appendChild(li);
      } else {
        unfinishedBooksList.appendChild(li);
      }
    });
  }

  // Add a new book
  addBookButton.addEventListener('click', function() {
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const year = parseInt(yearInput.value.trim(), 10);
    const isComplete = isCompleteInput.checked;
    const id = +new Date(); // Unique ID using timestamp

    if (title && author && year) {
      const newBook = {
        id,
        title,
        author,
        year,
        isComplete,
      };

      books.push(newBook);
      localStorage.setItem('books', JSON.stringify(books));
      renderBooks();
      
      // Clear input fields
      titleInput.value = '';
      authorInput.value = '';
      yearInput.value = '';
      isCompleteInput.checked = false;
    } else {
      alert('Mohon lengkapi data buku terlebih dahulu!');
    }
  });

  // Delete a book by its ID
  function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }

  // Initial render
  renderBooks();
});
