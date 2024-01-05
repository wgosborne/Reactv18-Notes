import axios, { CanceledError } from 'axios';

//creating the reusable axios client
export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // headers: {
    //     'api-key': ''
    // }

});

export { CanceledError };