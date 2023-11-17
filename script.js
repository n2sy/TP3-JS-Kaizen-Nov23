
class Book {
    title;
    author;
    isbn;

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// function Book(title, author, isbn) {
//         this.title = title;
//         this.author = author;
//         this.isbn = isbn;
// }

// let livre1 = new Book("aaaaaa", "qqqqqqq", "1111111");
// console.log(livre1);

//Classe manipulant l'interface web (HTML)
class UI {
    addBookToList(book) {
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
            `;
        list.appendChild(row);
    }
    showAlert(message, nomDeLaClasse) {
        const newAlert = document.createElement('div');
        newAlert.className = `alert ${nomDeLaClasse}`
        newAlert.textContent = message;
        const divContainer = document.querySelector('.container');
        const formulaire = document.querySelector('#book-form');
        divContainer.insertBefore(newAlert, formulaire);

        setTimeout(() => {
            document.querySelector('.alert').remove();
           
        }, 2500);       
    }

    deleteBook(cible) { // cible c'est un élément de la ligne qui a été cliqué
        if(cible.className == 'delete') {
            cible.parentElement.parentElement.remove();
        }
    }

    eraseInputs() {
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';
    }
}

//Classe manipulant localstorage
class Store {
    static getBooks() {
        let books = localStorage.getItem('access_books');
        if(books == null) {
            //alert("Il n'y a aucun livre actuellement");
            return [];
        }
        else {
            return JSON.parse(books);
        }
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => {
            let ui = new UI();
            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('access_books', JSON.stringify(books));
    }
    
    static removeBook(bookId) {
        const books = Store.getBooks();
        let i = books.findIndex((b) => b.isbn == bookId)
        books.splice(i, 1);
        localStorage.setItem('access_books', JSON.stringify(books));
    }
}

Store.displayBooks();

document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const ui = new UI();
    
    if(title == '' || author == '' || isbn == '') {
        ui.showAlert("Veuillez saisir tous les champs", 'alert-warning');
    }
    else {
        const newBook = new Book(title, author, isbn);
        ui.addBookToList(newBook);
        Store.addBook(newBook);
        ui.showAlert('Livre ajouté !', 'alert-success');
        ui.eraseInputs();
    }
    

})

document.getElementById('book-list').addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e);
    const ui = new UI();

    if(e.target.className == 'delete') {
        ui.deleteBook(e.target);
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        ui.showAlert('Livre supprimé', 'alert-danger')
    }
    else {
        
        ui.showAlert('Cliquez sur le X', 'alert-info')
    }


})

