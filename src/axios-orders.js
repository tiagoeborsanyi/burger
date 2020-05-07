import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-d9538.firebaseio.com/'
});

export default instance;