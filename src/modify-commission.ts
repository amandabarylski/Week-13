//I moved the toggle and delete functions to the same file.
//If there was an edit commission option, it would probably end up here as well.
//I just copied and pasted the import from the add-commission document.
import { render, baseURL } from "./main"

//Though 'this' here was showing a type error, the delete button still worked.
//I looked up how to give this a type, and found that you can put it in the function parameters.
//Then I just had to specify that it was a button with the correct syntax, and my test showed that it worked.
export const deleteCommission = async function (this: HTMLButtonElement) {
    await fetch(`${baseURL}/commissions/${$(this).data("index")}`, {
        method: "DELETE",
    })
    render()
}

//I had to mark this as a button again here.
export const toggleCommission = async function (this: HTMLButtonElement) {

    const id = $(this).data("index")
    const commission = await fetchCommission(id)
    
    await fetch(`${baseURL}/commissions/${id}`, {
        method: "PUT",
        headers:  { "Content-Type": "application/json" },
        body: JSON.stringify({ ...commission, taken: !commission.taken }),
    })

    render()
}

//As in my custom type, I labelled id as a string.
//As this is only used in toggleCommission, I didn't export it.
const fetchCommission = async (id: string) => {

    const response = await fetch(`${baseURL}/commissions/${id}`)

    const data = await response.json()

    return data
}