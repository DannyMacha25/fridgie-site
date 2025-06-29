import axios from "axios"
const URL = 'https://useful-illegally-leopard.ngrok-free.app'


const subscribeToNewsletter = (email : string) => {
    const endpoint = '/subscribe'
    const finalUrl = URL + endpoint

    return axios.post(finalUrl, {'email' : email}).then(response => response.data)
}

export default {
    subscribeToNewsletter
}