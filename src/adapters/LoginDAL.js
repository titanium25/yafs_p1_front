import axios from "axios";

const url = 'http://localhost:2020/api/users';

const signUp = (obj) => {
    return axios.post(url + '/signup', obj, {withCredentials: true})
}

const logIn = (obj) => {
    return axios.post(url + '/login', obj, {withCredentials: true})
}

const refreshToken = () => {
    return axios.post(url + '/refreshToken', {}, {withCredentials: true})
}

const logOut = () => {
    return axios.get(url + '/logout')
}


export default {signUp, logIn, refreshToken, logOut}