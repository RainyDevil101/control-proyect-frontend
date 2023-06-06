import axios from "axios";

//develope

const backendConnect = axios.create({
    baseURL: 'https://control-project-backend.onrender.com'
})

// const backendConnect = axios.create({
//     baseURL: 'http://localhost:3000'
// })


export default backendConnect;