let myLibrary = [];
let globalID = 0;

function Book(title, author, numPages, read = false, ID = globalID) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.getID = () => {
        return ID;
    };

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
    globalID += 1;
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
const createAndAppendCard = (title, author, numPages, read, id) => {

    //parent
    const card = document.createElement("div");
    card.classList.add('card');
    card.id = id;

    //card content
    const cardContent = document.createElement("div");
    cardContent.classList.add('card-content');



    //populate card content
    const h3 = document.createElement('h3');
    h3.textContent = title;
    h3.classList.add("font-black");
    cardContent.appendChild(h3);

    const h4 = document.createElement('h4');
    h4.textContent = `by ${author}`;
    h4.classList.add("font-bold");
    cardContent.appendChild(h4);

    const p1 = document.createElement('p');
    p1.textContent = `${numPages} pages`;
    p1.classList.add("font-normal");
    cardContent.appendChild(p1);

    const p2 = document.createElement('p');

    const checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "card-read");
    checkbox.setAttribute("id", "card-read");
    checkbox.onclick = () => {myLibrary[card.id].toggleRead()}
    checkbox.checked = read;

    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = 'Read?';
    checkboxLabel.classList.add("font-normal");
    checkboxLabel.setAttribute("for", "card-read");

    p2.appendChild(checkbox);
    p2.appendChild(checkboxLabel);

    cardContent.appendChild(p2);

    //add content to parent card div
    card.appendChild(cardContent);

    //create delete button 
    const delButton = document.createElement('button');
    delButton.classList.add('alert');
    delButton.classList.add('font-bold');
    delButton.textContent = 'Delete Book';

    card.appendChild(delButton);

    return card;
}

const appendCardToDOM = () => {
    //get root cards div 
    let cards = document.querySelector('.cards');
    for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
        const cardID = myLibrary[i].getID();
        const card = createAndAppendCard(myLibrary[i].title, myLibrary[i].author, myLibrary[i].numPages, myLibrary[i].read, cardID);
        cards.appendChild(card);
    }
}

const deleteBook = (id) => {
    myLibrary.splice(id, 1);
    let parentElement = document.getElementById(id);
    parentElement.parentNode.removeChild(parentElement); 
}




//events 
const addBtn = document.querySelector('.addBook');
addBtn.addEventListener('click', () => {
    addNewBook();
    appendCardToDOM();
});

const form = document.querySelector('.addBookForm');
const handleSubmit = (e) => {
    e.preventDefault();
    closeForm();
};
form.addEventListener('submit', handleSubmit);

//event for deleting cards
const cardsContainer = document.querySelector('.cards');
// const deleteBookBtn = document.querySelector('.alert');
cardsContainer.addEventListener('click', (e) => {
    if(e.target && e.target.matches(".alert")){
        const deleteBookBtn = e.target;
        const id = deleteBookBtn.parentElement.id;
        deleteBook(id); 
    }
})
    