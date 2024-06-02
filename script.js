const myLibrary = [];
const output = document.querySelector('.output');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const submit = document.querySelector('#submit');
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const jsCloseBtn = dialog.querySelector("#js-close");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let flag = 0;
  pages = Number(pages);
  if (title.length <= 20 && author.length <= 20 && pages < 10000) {
    for (const book of myLibrary) {
      if (book.title === title) {
        flag = 1;
      }
    }
    if (!flag) {
      let book = new Book(title, author, pages, read);
      myLibrary.push(book);
    } else {
      window.alert("Book with same title exists");
    }
  } else if (pages >= 10000) {
    window.alert("Number of pages too large");
  } else {
    window.alert("Input char length too large (more than 20)");
  }
}

function getIndex(title) {
  let index = 0;
  for (const book of myLibrary) {
    if (book.title === title) {
      return index;
    }
    index++;
  }
  return -1; // Return -1 if the book is not found
}

function removeBook(index) {
  if (index > -1) {
    myLibrary.splice(index, 1);
  }
}

function show() {
  output.innerHTML = '';
  for (const book of myLibrary) {
    let elem = document.createElement('div');
    elem.classList.add('book');

    let bookTitle = document.createElement('div');
    bookTitle.textContent = `"${book.title}"`;
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
      bookRead.style.backgroundColor = 'rgb(255, 124, 124)';
    }
    else {
      bookRead.style.backgroundColor = 'rgb(208, 255, 138)';
    }
    bookRead.addEventListener('click', () => {
      // Change the read status
      if (bookRead.textContent === 'read') {
        bookRead.textContent = 'not read yet';
        book.read = 'not read yet';
        bookRead.style.backgroundColor = 'rgb(255, 124, 124)';
      }
      else {
        bookRead.textContent = 'read';
        book.read = 'read';
        bookRead.style.backgroundColor = 'rgb(208, 255, 138)';
      }
    });

    let removeElem = document.createElement('div');
    removeElem.textContent = 'Remove';
    removeElem.classList.add('remove');
    removeElem.addEventListener('click', () => {
      let index = getIndex(book.title);
      removeBook(index);
      show();
    });

    output.appendChild(elem);
    elem.appendChild(bookTitle);
    elem.appendChild(bookAuthor);
    elem.appendChild(bookPages);
    elem.appendChild(bookRead);
    elem.appendChild(removeElem);
  }
}

function clearForm() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  // Check if all required fields are filled
  const titleValue = title.value.trim();
  const authorValue = author.value.trim();
  const pagesValue = pages.value.trim();

  if (titleValue !== '' && authorValue !== '' && pagesValue !== '') {
    addBookToLibrary(titleValue, authorValue, pagesValue, read.checked ? 'read' : 'not read yet');
    clearForm();
    show();
    dialog.close(); // Close the dialog after submitting
  }
});

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

jsCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

// Adding sample book
addBookToLibrary('Matilda', 'Roald Dahl', 556, 'read');

show();
