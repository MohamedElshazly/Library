let myLibrary = []; 

function Book(title, author, numPages, read=false) {
    this.title = title; 
    this.author = author; 
    this.numPages = numPages;
    this.read = read; 

    this.toggleRead = () => {
        this.read = !(this.read); 
    }
}

const addNewBook = () => {
    const bookArguments = {
        title: '',
        author: '',
        numPages: 0,
        read: false
    }; 
    bookArguments.title = document.getElementById('title').value;
    bookArguments.author = document.getElementById('author').value;
    bookArguments.numPages = document.getElementById('num').value;
    bookArguments.read = document.getElementById('read').checked;
    const book = new Book(bookArguments.title, bookArguments.author, bookArguments.numPages, bookArguments.read);
    myLibrary.push(book);
};
//utility functions 
const openForm = () => {
    document.querySelector('.addBookForm').style.display = "block";
    document.querySelector('.addBookForm').classList.add('dim');
};
const closeForm = () => {
    document.querySelector('.addBookForm').style.display = "none";
    document.querySelector('.addBookForm').classList.remove('dim');
    document.querySelector('.addBookForm').reset();
};

//events 
const addBtn = document.querySelector('.addBook'); 
addBtn.addEventListener('click', () => {
   addNewBook();
}); 

const pageTitle = document.querySelector('h1'); 

pageTitle.addEventListener('click', () => {
    console.log(myLibrary);
});

const form = document.querySelector('.addBookForm'); 
const handleSubmit = (e) => {
    e.preventDefault();
    // addNewBook(); 
    closeForm();
};
form.addEventListener('submit', handleSubmit);

