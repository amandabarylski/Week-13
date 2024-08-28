//This file was used only for the add commission function.
//It was the longest of the three and toggle and delete fit together better as well.
//Sure enough, I had to import the render and baseURL to use them here.
import { render, baseURL } from "./main"

//I changed this into a regular function and tied the click event into the main ts file.
//It felt a little strange to have the click event and the function in separate documents,
//but as all of my functions are tied to clicks it was inevitable.
export const addCommission = async () => {

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
}