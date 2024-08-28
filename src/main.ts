//I started by copy and pasting my CSS file content over their default one, and left the import as is.
//bootstrap.bundle.js came up with an error, so I switched to using just bootstrap.js as that one was fine.
//I had to use npm install to get the types for jquery as importing it from the node modules wasn't enough.
//When I first loaded the page some of my colors didn't load as I had put the bootstrap CSS below my custom CSS.
//I switched the order of importing them and that fixed it.

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './style.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/jquery/dist/jquery.js'
//Because the imported functions weren't being actively called but were instead including the click events,
//I had to adjust the way my code was written so that the click events were happening here instead.
//That way I could import the functions back to here.
import { addCommission } from './add-commission.js'
import { deleteCommission, toggleCommission } from './modify-commission.js'

//Once I had everything converted, I tested the app and it worked exactly as it did last week
//while all of the code was in the same file.
//My main concern with splitting them is that the baseURL and render will be required in all of them.
//Most likely I will need to export them to the other files as well, but I will test as I go along.

export const baseURL = 'http://localhost:3000'

//I decided to leave fetchCommissions and render in the main file, with the other functions being split off.
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

//The render is a little slow at the start at times in the live server.
//I noticed this last week as well. However, once it empties the board it is basically instant.
export const render = async () => {

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

$('#add-commission').on('click', addCommission)

//After my changes .on is showing as deprecated here; however, both functions still work as intended.
//I can't find an answer on why it would show as deprecated, so perhaps it's a bug that's mismarking it.
$(document).on("click", ".deleteCommission", deleteCommission)

$(document).on("click", ".toggleCommission", toggleCommission)
