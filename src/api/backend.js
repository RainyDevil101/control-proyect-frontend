import axios from "axios";

const backendConnect = axios.create({
    baseURL: 'http://localhost:6003'
})

// const backendConnect = axios.create({
//    baseURL: 'https://material-db-be.herokuapp.com'
// })

export default backendConnect