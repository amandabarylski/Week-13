import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './style.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/jquery/dist/jquery.js'
//I started by copy and pasting my CSS file content over their default one, and left the import as is.
//bootstrap.bundle.js came up with an error, so I switched to using just bootstrap.js as that one was fine.
//I had to use npm install to get the types for jquery as importing it from the node modules wasn't enough.
//When I first loaded the page some of my colors didn't load as I had put the bootstrap CSS below my custom CSS.
//I switched the order of importing them and that fixed it.
const baseURL = 'http://localhost:3000'


const fetchCommissions = async () => {

    const response = await fetch(`${baseURL}/commissions`)
    const data = await response.json()
    return data
}

//For my custom type, I marked id as a string as the automatically created strings contain both numbers and letters.
//The rest were more simple to work out.
type commission = {
  id: string,
  title: string,
  risk: number,
  description: string,
  taken: boolean
}

const render = async () => {

    const commissions = await fetchCommissions()

    $('#commission-board').empty()
//The commission parameter wanted a type, so I created a type above my render function rather than typing it all out here.
//Since this is the only place it was used, I could have just done it here but it would have looked messier.
    commissions.forEach(function (commission: commission) {
        let commissionPost = `<div class="col">
        <div class="card h-100">
            <div class="card-header ${commission.taken ? "taken" : ""}">
                <h3>${commission.title}</h3>
            </div>
            <div class="card-body">
                <h5 class="card-title ${commission.taken ? "taken" : ""}">Risk Rating: <strong>${commission.risk}</strong></h4>
                <p class="card-text ${commission.taken ? "taken" : ""}">${commission.description}</p>
                <div class="row">
                    <button type="button" class="btn ${commission.taken ? "btn-secondary" : "btn-success"} toggleCommission col-auto mx-auto" data-index="${commission.id}">
                    ${commission.taken ? "Taken" : "Available"}</button>
                    <button type="button" class="btn btn-danger deleteCommission col-auto mx-auto" data-index="${commission.id}">Delete</button>
                </div>
            </div>
        </div>
    </div>`

    $('#commission-board').append(commissionPost)
    });
}


render()


$('#add-commission').on('click', async () => {

    if ($('#title').val() == '') {
        return alert('Please enter a title for your commission!')
    } else if ($('#description').val() == '') {
        return alert('Please give a short description of your commission!')
    } else {
        const newCommission = { title: $('#title').val(), risk: $('#risk-rating').val(), description: $('#description').val(), taken: false}
        const response = await fetch(`${baseURL}/commissions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCommission)
        })
        await response.json()
        render()
        $('#title').val('')
        $('#risk-rating').val(1)
        $('#description').val('')
    }
})


$(document).on("click", ".deleteCommission", async function () {
    await fetch(`${baseURL}/commissions/${$(this).data("index")}`, {
        method: "DELETE",
    })
    render()
})

$(document).on("click", ".toggleCommission", async function () {

    const id = $(this).data("index")
    const commission = await fetchCommission(id)
    
    await fetch(`${baseURL}/commissions/${id}`, {
        method: "PUT",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({ ...commission, taken: !commission.taken }),
    })

    render()
})

//This was my only type error outside of the commission parameter.
//As in my custom type, I labelled id as a string.
const fetchCommission = async (id: string) => {

    const response = await fetch(`${baseURL}/commissions/${id}`)

    const data = await response.json()

    return data
}
