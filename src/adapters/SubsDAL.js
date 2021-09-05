import axios from "axios";

const url = 'http://localhost:2020/api/subs';

const getAllSubs = () => {
    return axios.get(url)
}

const addSubs = (obj) => {
    return axios.post(url, obj)
}

const getSubs = (id) => {
    return axios.get(url + '/get/' + id)
}

const getMemberList = (movieId) => {
    return axios.get(url + '/movie/' + movieId)
}

const updateAllSubs = (movieId) => {
    return axios.put(url + '/' + movieId)
}

const updateSubs = (movieId, subsId) => {
    return axios.put(url + '/movie/' + movieId + '/subs/' + subsId)
}

export default {getAllSubs, addSubs, getSubs, getMemberList, updateAllSubs, updateSubs}