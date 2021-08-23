import axios from "axios";

const url = 'http://localhost:2020/api/movies';

const getAllMovies = (page, size, all) => {
    return axios.get(url + '?page=' + page + '&size=' + size + '&all=' + all)
}

const getTotal = () => {
    return axios.get(url  + '/lib/count')
}

const getMovie = (id) => {
    return axios.get(url + id)
}

const addMovie = (movie) => {
    return axios.post(url, movie)
}


export default {getAllMovies, getTotal, getMovie, addMovie}