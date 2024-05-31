const myLibrary = [];
const output = document.querySelector('.output');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const submit = document.querySelector('#submit');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let flag = 0;
  if (title.length <= 20 && author.length <= 20 && pages < 10000) {
    for (const book of myLibrary) {
      if (book.title === title) {
        flag = 1;
      }
    }
    if (!flag) {
      let book = new Book(title, author, pages, read);
      myLibrary.push(book);
    }
    else {
      window.alert("Book with same title exists");
    }
  }
  else if (pages >= 10000) {
    window.alert("Number of pages too large");
  }
  else {
    window.alert("Input char length too large (more than 20)");
  }
}

function show() {
  output.innerHTML = '';
  for (const book of myLibrary) {
    let elem = document.createElement('div');
    elem.classList.add('book');

    let bookTitle = document.createElement('div');
    bookTitle.textContent = book.title;
    bookTitle.classList.add('title');

    let bookAuthor = document.createElement('div');
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add('author');

    let bookPages = document.createElement('div');
    bookPages.textContent = book.pages;
    bookPages.classList.add('pages');

    let bookRead = document.createElement('div');
    bookRead.textContent = book.read;
    bookRead.classList.add('read');
    if (bookRead.textContent === 'not read yet') {
      bookRead.style.backgroundColor = 'rgb(240, 28, 28)';
    }
    bookRead.addEventListener('click', () => {
      // Change the read status
      if (bookRead.textContent === 'read') {
        bookRead.textContent = 'not read yet';
        book.read = 'not read yet';
        bookRead.style.backgroundColor = 'rgb(240, 28, 28)';
      }
      else {
        bookRead.textContent = 'read';
        book.read = 'read';
        bookRead.style.backgroundColor = 'greenyellow';
      }
    });

    output.appendChild(elem);
    elem.appendChild(bookTitle);
    elem.appendChild(bookAuthor);
    elem.appendChild(bookPages);
    elem.appendChild(bookRead);
  }
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
addBookToLibrary('Matilda', 'Roald Dahl', 232, 'read');
addBookToLibrary('To Killbird', 'Harper Lee', 336, 'not read yet');
addBookToLibrary('Thebbit', 'J.R.R. Tolkien', 295, 'not read yet');
addBookToLibrary('Matda', 'Roald Dahl', 232, 'read');
addBookToLibrary('Tollbird', 'Harper Lee', 336, 'not read yet');
addBookToLibrary('Tollbisdsrd', 'Harper Lee', 336, 'not read yet');
addBookToLibrary('Tolldsdsbird', 'Harper Lee', 336, 'not read yet');

submit.addEventListener('click', () => {
  // Check if all required fields are filled
  if (title.value.trim() !== '' && author.value.trim() !== '' && pages.value.trim() !== '') {
    addBookToLibrary(title.value, author.value, pages.value, read.checked ? 'read' : 'not read yet');
    show();
  }
});

show();
