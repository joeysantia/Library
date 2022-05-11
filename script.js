const myLibrary = []

let read = false

let booksReadNum = 0
let booksUnreadNum = 0

const container = document.querySelector('.container')

const booksRead = document.querySelector('#books-read')
const booksUnread = document.querySelector('#books-unread')
const booksTotal = document.querySelector('#books-total')



class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author 
        this.pages = pages 
        this.read = read 
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function updateStatistics() {
    booksRead.textContent = `Books Read: ${booksReadNum}`
    booksUnread.textContent = `Books Unread: ${booksUnreadNum}`
    booksTotal.textContent = `Books Total: ${booksReadNum + booksUnreadNum}`
}

function displayBookNew(myLibrary) {
    while (container.firstChild) {
       container.removeChild(container.lastChild)
    }

    let libraryCounter = 0;

    for (let i=0; i<myLibrary.length; i++) {

        let entry = document.createElement('div')
        container.appendChild(entry)  

        let title = document.createElement('h2')     
        title.textContent = myLibrary[i].title
        entry.appendChild(title) 

        let author = document.createElement('p')
        author.textContent = myLibrary[i].author
        entry.appendChild(author)

        let pages = document.createElement('p')
        pages.textContent = `${myLibrary[i].pages} pages`
        entry.appendChild(pages)

        let buttonRow = document.createElement('div')
        buttonRow.style.display = 'flex';
        buttonRow.style.gap = '8px'
        entry.appendChild(buttonRow)

        let readButton = document.createElement('button')
        readButton.setAttribute('class', `${libraryCounter}`)
        readButton.style.background = (myLibrary[i].read ? 'var(--green-button-color)' : 'var(--red-button-color)') 
        readButton.textContent = (myLibrary[i].read ? 'Read' : 'Unread')
        buttonRow.appendChild(readButton)

        let bookNum = readButton.getAttribute('class').slice(-1)

        readButton.addEventListener('click', (e) => {
            let numberOfTruth = readButton.getAttribute('class')

            if (myLibrary[numberOfTruth].read) {
                readButton.textContent = 'Unread';
                readButton.style.background = 'var(--red-button-color)';
                booksReadNum--
                booksUnreadNum++
            } else {
                readButton.textContent = 'Read';
                readButton.style.background = 'var(--green-button-color)';
                booksReadNum++
                booksUnreadNum--
            }
            myLibrary[numberOfTruth].read = !myLibrary[numberOfTruth].read
            updateStatistics() 
        })

        let removeButton = document.createElement('button')
        removeButton.style.background = 'red';
        removeButton.setAttribute('class', `${libraryCounter}`)
        removeButton.textContent = 'Remove';
        buttonRow.appendChild(removeButton)


        removeButton.addEventListener('click', (e) => {
            container.removeChild(entry)
            let numberOfTruth = removeButton.getAttribute('class')
           myLibrary[numberOfTruth].read ? booksReadNum-- : booksUnreadNum--;
           
           myLibrary.splice(numberOfTruth, 1)
           displayBookNew(myLibrary)
           updateStatistics() 
        })
        libraryCounter++
    }
}

const addButton = document.querySelector('.add-button')


addButton.addEventListener('click', (e) => {
    read = false 
    let page = document.querySelector('body')

    let form = document.createElement('form')
    form.setAttribute('method', '#')
    form.setAttribute('action', 'post')
    form.setAttribute('novalidate', 'true')
    page.appendChild(form)

    let heading = document.createElement('h2')
    heading.style.marginTop = 0;
    heading.textContent = 'New Book'
    form.appendChild(heading)

    function labelMaker(element, text) {
        let label = document.createElement('label')
        label.setAttribute('for', element)
        label.textContent = text
        form.appendChild(label)
    }
    
    function inputMaker(element, inputType) {
        let input = document.createElement('input')
        input.setAttribute('type', inputType)
        input.setAttribute('id', element)
        input.setAttribute('name', element)
        if (inputType !== 'checkbox') {
            input.setAttribute('required', 'required')
            input.classList.add('required')
        } else {
            input.addEventListener('click', (e) => {
                read = !read
            })
        }
        input.addEventListener('input', (e) => {
            if (input.validity.valueMissing) {
                input.reportValidity();
                input.setCustomValidity('No blank fields!')
            } else {
                input.validity.customError = false 
                input.setCustomValidity('')
                input.reportValidity()
            }
        })
        form.appendChild(input)
    }

    inputMaker('title', 'text')

    labelMaker('title', 'Title')

    inputMaker('author', 'text')

    labelMaker('author', 'Author')

    inputMaker('pages', 'number')

    labelMaker('pages', 'Number of pages')

    inputMaker('read', 'checkbox')

    labelMaker('read', 'I have already read this book')

    let formButton = document.createElement('button')
    formButton.textContent = 'Add'
    form.appendChild(formButton)

    form.addEventListener('submit', (e) => e.preventDefault())

    form.addEventListener('submit', (e) => {
        const requiredInputs = document.querySelectorAll('.required')
        requiredInputs.forEach((input) => {
            if (input.validity.valueMissing) {
                input.setCustomValidity('No blank fields!')
                input.reportValidity()
            }
        })

        if ([...requiredInputs].every((input) => !input.validity.valueMissing)) {
            requiredInputs.forEach((input) => {
                input.setCustomValidity('')
                input.reportValidity()
            })
            let title = document.querySelector('#title')
            let author = document.querySelector('#author')
            let pages = document.querySelector('#pages')
            read ? booksReadNum++ : booksUnreadNum++

            updateStatistics() 
            
            let newBook = new Book(title.value, author.value, pages.value, read) 
            addBookToLibrary(newBook)

            displayBookNew(myLibrary)

            page.removeChild(form)
        }
    })
/*
    form.addEventListener('submit', (e) => {
        let title = document.querySelector('#title')
        let author = document.querySelector('#author')
        let pages = document.querySelector('#pages')
        read ? booksReadNum++ : booksUnreadNum++

        updateStatistics() 
        
        let newBook = new Book(title.value, author.value, pages.value, read) 
        addBookToLibrary(newBook)

        displayBookNew(myLibrary)

        page.removeChild(form)
    })
*/

})

