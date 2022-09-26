const theme = document.getElementById('theme')
const newItemInput = document.getElementById('addItem')
const todoList = document.querySelector('.content ul')
const itemsLeft = document.querySelector('.itemsLeft span')

itemsLeft.innerText = document.querySelectorAll('.list-item input').length;

theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'themeLight' : 'themeDark'];
})

newItemInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value)
        newItemInput.value = ''
    }
})

function createNewTodoItem(text) {
    const element = document.createElement('li')

    element.innerHTML = `
        <label class="listItem">
            <input type="checkbox" name="todoItem" id="todoItem">
            <span class="checkmark"></span>
            <span class="text">${text}</span>
        </label>
        <span class="remove"></span>
    `

    if (document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
        elem.classList.add('hidden');
    }

    todoList.append(element)
    updatItemsCount(1)
}

function updatItemsCount(number) {
    itemsLeft.innerText = + itemsLeft.innerText + number
}

function removeTodoItem(elem) {
    elem.remove()
    updatItemsCount(-1)
}

todoList.addEventListener('click',(event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement)
    }
})

document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.listItem input:checked').forEach(item => {
        removeTodoItem(item.closest('li'))
    })
})

document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (e) => {
        filterTodoItems(e.target.id)
    });
});

function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li')

    switch(id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden')
            })
            break
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden')
            })
            break
        default: 
            allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden')
            })
            break
    }
}