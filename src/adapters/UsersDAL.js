import axios from "axios";

const url = 'http://localhost:2020/api/users';

const getAllUsers = () => {
    return axios.get(url)
}

const addUser= (obj) => {
    return axios.post(url, obj)
}

const deleteUser= (id) => {
    return axios.delete(url + '/' + id)
}

const editUser = (id, obj) => {
    return axios.put(url + '/' + id, obj)
}


export default {getAllUsers, addUser, deleteUser, editUser}