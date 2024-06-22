document.addEventListener('DOMContentLoaded', function() {
  const addBookButton = document.getElementById('addBookButton');
  const saveEditButton = document.getElementById('saveEditButton');
  const titleInput = document.getElementById('titleInput');
  const authorInput = document.getElementById('authorInput');
  const yearInput = document.getElementById('yearInput');
  const isCompleteInput = document.getElementById('isCompleteInput');
  const editModal = document.getElementById('editModal');
  const editTitleInput = document.getElementById('editTitleInput');
  const editAuthorInput = document.getElementById('editAuthorInput');
  const editYearInput = document.getElementById('editYearInput');
  const editIsCompleteInput = document.getElementById('editIsCompleteInput');
  const searchUnfinishedInput = document.getElementById('searchUnfinished');
  const searchFinishedInput = document.getElementById('searchFinished');
  const unfinishedBooksList = document.getElementById('unfinishedBooks');
  const finishedBooksList = document.getElementById('finishedBooks');

  let books = JSON.parse(localStorage.getItem('books')) || [];
  let editingBookId = null;

  function renderBooks(filteredBooks = books) {
    unfinishedBooksList.innerHTML = '';
    finishedBooksList.innerHTML = '';

    filteredBooks.forEach(book => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${book.title}</strong> (${book.year}) - ${book.author}
        <button class="delete-btn" data-id="${book.id}">Hapus</button>
        <button class="edit-btn" data-id="${book.id}">Edit</button>
      `;

      const deleteButton = li.querySelector('.delete-btn');
      deleteButton.addEventListener('click', function() {
        deleteBook(book.id);
      });

      const editButton = li.querySelector('.edit-btn');
      editButton.addEventListener('click', function() {
        openEditModal(book.id);
      });

      if (book.isComplete) {
        finishedBooksList.appendChild(li);
      } else {
        unfinishedBooksList.appendChild(li);
      }
    });
  }

  function addBook(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const year = parseInt(yearInput.value.trim(), 10);
    const isComplete = isCompleteInput.checked;
    const id = +new Date();

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
      titleInput.value = '';
      authorInput.value = '';
      yearInput.value = '';
      isCompleteInput.checked = false;
    }
  }

  function deleteBook(id) {
    books = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }

  function openEditModal(id) {
    const book = books.find(book => book.id === id);
    editingBookId = id;
    editTitleInput.value = book.title;
    editAuthorInput.value = book.author;
    editYearInput.value = book.year;
    editIsCompleteInput.checked = book.isComplete;
    editModal.style.display = 'block';
  }

  function saveEdit(event) {
    event.preventDefault();
    const title = editTitleInput.value.trim();
    const author = editAuthorInput.value.trim();
    const year = parseInt(editYearInput.value.trim(), 10);
    const isComplete = editIsCompleteInput.checked;

    books = books.map(book => {
      if (book.id === editingBookId) {
        return { ...book, title, author, year, isComplete };
      }
      return book;
    });

    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
    editModal.style.display = 'none';
  }

  function closeEditModal() {
    editModal.style.display = 'none';
  }

  function searchBooks(event) {
    event.preventDefault();
    const searchUnfinished = searchUnfinishedInput.value.toLowerCase();
    const searchFinished = searchFinishedInput.value.toLowerCase();

    const filteredBooks = books.filter(book => {
      if (searchUnfinished && !book.isComplete) {
        return book.title.toLowerCase().includes(searchUnfinished);
      }
      if (searchFinished && book.isComplete) {
        return book.title.toLowerCase().includes(searchFinished);
      }
      return false;
    });

    renderBooks(filteredBooks);
  }

  addBookButton.addEventListener('click', addBook);
  saveEditButton.addEventListener('click', saveEdit);
  document.getElementById('closeEditModal').addEventListener('click', closeEditModal);
  document.getElementById('searchBook').addEventListener('submit', searchBooks);

  renderBooks();
});
