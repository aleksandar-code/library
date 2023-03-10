let myLibrary = [];
let author = document.getElementById("author");
let title = document.getElementById("title");
let genre = document.getElementById("genre");
let read = document.getElementById("read");

let newBook = document.getElementById("new-book");

let form = document.getElementsByTagName("form")[0];

let submitButton = document.querySelector('button[type=submit]');

let booksBtn = document.getElementById("books");

let cancelForm = document.getElementById("cancel-form");

let library = document.getElementById("library");

let menuOnBooksPage = document.getElementById("books-menu");

let booksDisplay;

form.style.display = "none";
menuOnBooksPage.style.display = "none";


window.onload = () => {
    checkIfAnyBooks();
}

booksBtn.addEventListener("click", () => {
    showBooks();
    showBooksMenu();
});

menuOnBooksPage.addEventListener("click", () => {
    hideBooks();
    hideBooksMenu();
    checkIfAnyBooks();
});

newBook.addEventListener("click", () => {
    hideNewBook();
    showForm();
});

cancelForm.addEventListener("click", (e) => {
    resetForm();
    hideForm();
    showNewBook();
    e.preventDefault();
});

submitButton.addEventListener("click", (e) => {
    if (isFormComplete() == true) {
        addBookToLibrary(e);
        resetForm();
        hideForm();
        showNewBook();
        checkIfAnyBooks();
    }
});

class Book {
    constructor(author, title, genre, read) {
        this.author = author;
        this.title = title;
        this.genre = genre;
        this.read = read;
    }
}

function initialBooks() {
    let book1 = new Book("J. K. Rowling", "Harry Potter", "Epic", false)
    let book2 = new Book("Plato", "The Republic", "Politics", false)
    let book3 = new Book("Marcus Aurelius", "Meditations", "Stoicism", false)

    myLibrary.push(book1)
    myLibrary.push(book2)
    myLibrary.push(book3)
}

function checkIfAnyBooks() {
    if (myLibrary.length == 0) {
        booksBtn.style.display = "none";
    }
    else {
        booksBtn.style.display = "block";
    }
}

function addBookToLibrary(e) {
    myLibrary.push(createBook());
    e.preventDefault();
}

function createBook() {
    const a = author.value
    const b = title.value
    const c = genre.value
    const d = read.checked
    return new Book(a, b, c, d);
}

function isFormComplete() {
    arr = [author, title, genre]

    for(x of arr) {
        if (x.value === '')  {
            return false
        }
    }
    return true
}

function resetForm() {
    author.value = "";
    title.value = "";
    genre.value = "";
    read.checked = false;
}

function hideForm() {
    form.style.display = "none";
}

function showForm() {
    form.style.display = "flex";
}

function hideNewBook() {
    newBook.style.display = "none";
    booksBtn.style.display = "none";
}

function showNewBook() {
    newBook.style.display = "block";
    booksBtn.style.display = "block";

}

function hideBooks() {
    booksDisplay.remove();
}

function showBooks() {
    booksDisplay = document.createElement("div");

    booksDisplay.setAttribute("id", "books-display");

    library.appendChild(booksDisplay);

    let i = 0;
    for (x of myLibrary) {
        let bookCard = document.createElement("div")
        bookCard.classList.add("card")
        fillBookCard.call(myLibrary[i], bookCard, i)
        booksDisplay.appendChild(bookCard)
        i++;
    }
    addRemoveBtns();
    addChangeReadStatusBtn();
}

function addRemoveBtns() {
    let removeBtns = document.getElementsByClassName("remove-button");

    for (btn of removeBtns) {
        btn.addEventListener("click", (e) => {
            removeBook(e.composedPath()[1]);
        });
    }
}

function addChangeReadStatusBtn() {
    let readStatusBtns = document.getElementsByClassName("read-status");

    for (btn of readStatusBtns) {
        btn.addEventListener("click", (e) => {
            changeReadStatus(e.composedPath()[1]);
            hideBooks();
            showBooks();
        });
    }
}

function fillBookCard(bookCard, i) {
    arr = [this.author, this.title, this.genre]

    for (elem of arr) {
        let someText = document.createElement("div")
        someText.textContent = elem
        bookCard.appendChild(someText)
    }

    let readText = document.createElement("div")
    if (this.read == true) {
        readText.textContent = "You have read this book.";
    }
    else {
        readText.textContent = "You haven't read this book.";
    }
    bookCard.appendChild(readText)

    let removeBtn = document.createElement("button");

    let readStatusBtn = document.createElement("button");
    
    removeBtn.classList.add("remove-button")
    readStatusBtn.classList.add("read-status")

    removeBtn.textContent = "Remove"
    readStatusBtn.textContent = "Read"

    bookCard.appendChild(removeBtn)
    bookCard.appendChild(readStatusBtn)

    bookCard.dataset.arrayIndex = i;
}

function showBooksMenu() {
    menuOnBooksPage.style.display = "block";
    booksBtn.style.display = "none";
    newBook.style.display = "none";
}

function hideBooksMenu() {
    menuOnBooksPage.style.display = "none";
    booksBtn.style.display = "block";
    newBook.style.display = "block";
}

function removeBook(card) {
    let index = card.dataset.arrayIndex
    card.remove();
    myLibrary.splice(index, 1);
}

function changeReadStatus(card) {
    let index = card.dataset.arrayIndex
    let boolean = myLibrary[index].read
    myLibrary[index].read = (boolean == true) ? false : true
}

initialBooks();
