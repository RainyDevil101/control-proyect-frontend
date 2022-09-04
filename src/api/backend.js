import axios from "axios";

//develope

const backendConnect = axios.create({
    baseURL: 'https://control-project-backend.onrender.com'
})

// const backendConnect = axios.create({
//     baseURL: 'http://localhost:3000'
// })

// const backendConnect = axios.create({
//     baseURL: 'http://ec2-3-229-237-112.compute-1.amazonaws.com:3000'
// })

//cpanel

// const backendConnect = axios.create({
//     baseURL: 'http://balvin-cat.cl'
// })

//heroku

// const backendConnect = axios.create({
//    baseURL: 'https://material-db-be.herokuapp.com'
// })

export default backendConnect