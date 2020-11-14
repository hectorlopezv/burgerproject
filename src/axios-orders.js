import axios from 'axios';

const instance_orders = axios.create({
    baseURL: 'https://burgerbuilder-80b74.firebaseio.com/'
});

export default instance_orders;