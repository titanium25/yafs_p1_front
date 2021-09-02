import axios from "axios";

const url = 'http://localhost:2020/api/members';

const getAllMembers = () => {
    return axios.get(url)
}

const addMember = (obj) => {
    return axios.post(url, obj)
}

const deleteMember = (id) => {
    return axios.delete(url + '/' + id)
}

const editMember = (id, obj) => {
    return axios.put(url + '/' + id, obj)
}

export default {getAllMembers, addMember, deleteMember, editMember}