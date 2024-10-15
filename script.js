const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
};

document.getElementById('new-book-button').addEventListener('click', () => {
    document.getElementById('book-form').classList.toggle('hidden');
});

document.getElementById('cancel-button').addEventListener('click', () => {
    document.getElementById('book-form').classList.add('hidden');
});

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    addBookToLibrary();
});

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    // Clear the form fields
    document.getElementById('form').reset();

    // Add the book to the display
    displayBooks();

    // Optional: Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Book added successfully!';
    successMessage.className = 'success-message';
    document.body.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 2000); // Remove after 2 seconds
}

function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear the existing books
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book visible';
        bookDiv.innerHTML = `
            <p>${book.info()}</p>
            <div class="checkbox-container">
                <input type="checkbox" class="read-checkbox" data-index="${index}" ${book.read ? 'checked' : ''}>
                <label for="read-checkbox-${index}">Read</label>
            </div>
            <button class="remove-book" data-index="${index}"><i class="fas fa-trash-alt"></i> Remove</button>
        `;
        libraryDiv.appendChild(bookDiv);
    });

    // Add event listeners for remove buttons and checkboxes
    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.closest('.remove-book').dataset.index;
            myLibrary.splice(index, 1); // Remove the book from the library
            displayBooks(); // Update the display
        });
    });

    document.querySelectorAll('.read-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const index = event.target.dataset.index;
            myLibrary[index].read = event.target.checked; // Update read status
            displayBooks(); // Update the display
        });
    });
}
