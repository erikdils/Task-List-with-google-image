
// log = console.log
// document.querySelector('h3').innerHTML = myDate

// const myDate = new Date()

// log(myDate)

const sub = async (e) => {
    e.preventDefault()

    const title = document.querySelector('input[name="title"]').value
    const description = document.querySelector('#description').value

    const data = {
        title,
        description
    }

    
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

async function start() {
    const response = await fetch('task');
    const data = await response.json();
    document.querySelector('.task-result').innerHTML = '';
    data.forEach(el => {
        document.querySelector('.task-result').innerHTML += `
        <div class="card ${(el.done) ? 'done' : ''}">
            <div class="card-body">
            <h3>${el.title}</h3>
            <div class="block">
            <div class="left">${el.description}</div>
            <div class="right">
            
            <button onclick="done('${el._id}')" class="btn btn-success ${(el.done) ? 'hidden' : ''}">&#x2714;</button>
            <button onclick="remove('${el._id}')" class="btn btn-danger">&#x2715;</button>
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
        body: JSON.stringify({done: true}) 
    });
    const result = await response.json()
    location.reload()
    // console.log(result)
}

async function remove(_id) {
    const response = await fetch(`task/${_id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    });
    const result = await response.json()
    location.reload()
    // console.log(_id)
}