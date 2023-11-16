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
    
    static removeBook(book) {
        const books = Store.getBooks();
        let i = books.indexOf(book);
        books.splice(i, 1)
        localStorage.setItem('access_books', JSON.stringify(books));
    }
}

Store.displayBooks();

document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const newBook = new Book(title, author, isbn);
    const ui = new UI();
    ui.addBookToList(newBook);
    Store.addBook(newBook);
    ui.showAlert('Livre ajouté !', 'alert-success');
    ui.eraseInputs();
})

