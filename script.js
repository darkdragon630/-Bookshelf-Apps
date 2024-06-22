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

  function renderBooks() {
    unfinishedBooksList.innerHTML = '';
    finishedBooksList.innerHTML = '';

    books.forEach(book => {
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

  function addBook() {
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

      books.push(new
