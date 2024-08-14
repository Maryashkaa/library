// Получаем кнопку "add book" и модальное окно, а также кнопку закрытия
const addBookButton = document.getElementById('addBook');// для открытия модального окна
const modal = document.getElementById('modal');//Модальное окно для добавления новой книги
const closeButton = document.querySelector('.close-button');//Кнопка закрытия модального окна

// Обработчик события на кнопку "add book". Когда кнопка нажата, модальное окно появляется.
addBookButton.addEventListener('click',()=> {
modal.style.display ='block';//// Показываем модальное окно
});

// Обработчик события на кнопку закрытия. Когда она нажата, модальное окно скрывается.
closeButton.addEventListener('click',()=> {
    modal.style.display ='none';//Скрываем модальное окно
});

// Обработчик события на клик по окну. Если клик происходит вне модального окна, оно закрывается.
window.addEventListener('click', (event) => {
    if (event.target === modal){ // Если кликнули на сам модал (внешнюю область)
        modal.style.display='none';// Скрываем модальное окно
    }
});

// Получаем форму для добавления новой книги
const addBookForm = document.getElementById('addBookForm');

// Обработчик события на отправку формы. Срабатывает, когда форма отправляется
addBookForm.addEventListener('submit', (event)=>{
    event.preventDefault(); //Предотвращаем стандартное поведение отправки формы (перезагрузка страницы)

// Получаем значения из полей формы
const name = document.getElementById('bookName').value; // Название книги
const author = document.getElementById('Author').value; // Автор книги
const pages = document.getElementById('Pages').value; // Количество страниц

// Создаём новый объект книги с использованием конструктора Book
const newBook = new Book(name, author, pages);

// Добавляем новую книгу в библиотеку и обновляем отображение
addBookToLibrary(newBook);

// Закрываем модальное окно и сбрасываем форму
modal.style.display = 'none';// Скрываем модальное окно после добавления книги
addBookForm.reset();// Очищаем поля формы
});

// Создаём массив для хранения всех книг
let myLibrary = [];

// Конструктор для создания объектов книги
function Book(name, author, pages){
    this.name = name;// Название книги
    this.author = author; // Автор книги
    this.pages = pages; // Количество страниц
}

// Функция для добавления новой книги в массив библиотеки и отображения её на странице
function addBookToLibrary(book){
    myLibrary.push(book);// Добавляем книгу в массив
    displayBooks();// Обновляем отображение книг на странице
}

// Функция для отображения всех книг в массиве на странице
function displayBooks() {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = ''; // Очистка контейнера

    // Перебираем массив книг и создаём карточку для каждой книги
myLibrary.forEach((book, index)=> {
    const bookCard = document.createElement('div');//новый элемент div для карточки книги
    bookCard.classList.add('book-card');//Добавляем класс для стилизации карточки

    //Внутренний HTML карточки с информацией о книге и кнопкой удаления
        bookCard.innerHTML = `
            <p><strong>Название:</strong> ${book.name}</p>
            <p><strong>Автор:</strong> ${book.author}</p>
            <p><strong>Страниц:</strong> ${book.pages}</p>
            <button data-index="${index}" class="remove-btn">Удалить</button>
        `;

        booksContainer.appendChild(bookCard);//Добавляем карточку в контейнер
    });

    //    // Привязываем обработчик события к кнопке "Удалить" для каждой книги
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            removeBook(e.target.dataset.index);// Удаляем книгу по индексу
        });
    });
}

// Функция для удаления книги из массива и обновления отображения
function removeBook(index) {
    myLibrary.splice(index, 1);// Удаляем книгу из массива по индексу
    displayBooks();// Обновляем отображение книг на странице
}


//Добавление книги:addBookForm — форма, в которую вводят данные 
//Когда форма отправляется, данные из полей (название, автор, страницы) извлекаются и создаётся новый объект книги с использованием данных
//Книга добавляется в массив myLibrary, и вызывается функция displayBooks, чтобы показать книгу на странице
//Массив книг: myLibrary — массив, который хранит все книги.Функция-конструктор Book используется для создания новых книг с нужными свойствами 
//Отображение книг:displayBooks — функция, которая перебирает массив myLibrary и создаёт HTML для каждой книги, отображая её на странице
//Удалить привязана к функции removeBook, которая удаляет книгу из массива и обновляет страницу
//removeBook — функция, которая удаляет книгу из массива myLibrary по её индексу, а затем обновляет отображение, чтобы эта книга исчезла с экрана//