import axios from "axios"
const URL = 'http://localhost:3001'


const subscribeToNewsletter = (email : string) => {
    const endpoint = '/subscribe'
    const finalUrl = URL + endpoint

    return axios.post(finalUrl, {'email' : email}).then(response => response.data)
}

export default {
    subscribeToNewsletter
}