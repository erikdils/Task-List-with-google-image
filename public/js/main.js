// log = console.log
// document.querySelector('h3').innerHTML = myDate

// const myDate = new Date()

// log(myDate)
log = console.log;
const sub = async (e) => {
    e.preventDefault()

    const titleInput = document.querySelector('input[name="title"]')
    const descriptionInput = document.querySelector('#description')

    const data = {
        title: titleInput.value,
        description: descriptionInput.value
    }

    titleInput.value = '';
    descriptionInput.value = '';


    const response = await fetch('task', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const result = await response.json(); // parses JSON response into native JavaScript objects
    start()
}

function getMonthName(date) {
    let monthName = '';
    const month = date.getMonth()
    if (month == 1) monthName = 'Января';
    if (month == 2) monthName = 'Февраля';
    if (month == 3) monthName = 'Марта';
    if (month == 4) monthName = 'Апреля';
    if (month == 5) monthName = 'Мая';
    if (month == 6) monthName = 'Июня';
    if (month == 7) monthName = 'Июля';
    if (month == 8) monthName = 'Августа';
    if (month == 9) monthName = 'Сентября';
    if (month == 10) monthName = 'Октября';
    if (month == 11) monthName = 'Ноября';
    if (month == 12) monthName = 'Декабря';

    return monthName
}

// const amounthInprogres = (tasks) => tasks.filter((t) => (!t[0].done) ? true : false).length;


function amounthInprogres(tasks) {
    return tasks.filter((t) => (!t[0].done) ? true : false).length
}

// function _amounthInprogres(tasks) {
//     return tasks.filter((t) => {
//         if (!t[0].done) return true
//         else return false;
//     }).length
// }

function amounthDone(tasks) {
    return tasks.filter((t) => (!t[0].done) ? false : true).length
}

function edit(i) {
    const card = document.querySelectorAll('.card')[i];
    const input = card.querySelector('.input-price');
    input.classList.remove('hide');
    const inputPrice = card.querySelector('.input-price_cent');
    inputPrice.classList.remove('hide');
    const addPriceButton = card.querySelector('.price-btn');
    addPriceButton.classList.add('hide');

    log(card)
}

async function start() {
    const response = await fetch('task');
    const tasks = await response.json();
    let date = new Date();
    document.querySelector('.task-result').innerHTML = '';
    document.querySelector('.data > h3').innerHTML = `${date.getDate()} ${getMonthName(date)}`;
    document.querySelector('.total > span').innerHTML = tasks.length; 
    document.querySelector('.remaining > span').innerHTML = amounthInprogres(tasks); 

    console.log(amounthInprogres(tasks))
    document.querySelector('.dones > span').innerHTML = amounthDone(tasks); 
    tasks.forEach((el, i) => {
        document.querySelector('.task-result').innerHTML += `
        <div class="card ${(el[0].done) ? 'done' : ''}">
            <div class="card-body">
            <h3>${el[0].title}</h3>
            <div class="block">
            <div class="left">
            ${el[0].description}
            ${(el[0].price) ? el[0].price : '<button onclick="edit('+ i +')" class="price-btn">Add Price</button>' }  
            <input type="number" class="input-price ${(el[0].edit) ? '' : 'hide' }">
            <input type="number" class="input-price_cent ${(el[0].edit) ? '' : 'hide' }">
            <button onclick="">Save</button>
            </div>

            <div class="right">
            <img src="${el[1][1]}" alt="">
            <button onclick="done('${el[0]._id}')" class="btn btn-success ${(el[0].done) ? 'hidden' : ''}">&#x2714;</button>
            <button onclick="remove('${el[0]._id}')" class="btn btn-danger">&#x2715;</button>
            </div>
            </div>
            </div>
        </div>
         `
    });
    // console.log(data)
}
start();

async function done(_id) {
    const response = await fetch(`task/${_id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            done: true
        })
    });
    const result = await response.json()
    start();
    // console.log(result)
}

async function remove(_id) {
    const response = await fetch(`task/${_id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    });
    const result = await response.json()
    start();
    // location.reload()
    // console.log(_id)
}