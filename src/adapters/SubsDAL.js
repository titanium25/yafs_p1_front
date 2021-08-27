import axios from "axios";

const url = 'http://localhost:2020/api/subs';

const getAllSubs= () => {
    return axios.get(url)
}

const addSubs= (obj) => {
    return axios.post(url, obj)
}

const getSubs= (id) => {
    return axios.get(url + '/get/' + id)
}

export default {getAllSubs, addSubs, getSubs}