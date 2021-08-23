import axios from "axios";

const url = 'http://localhost:2020/api/members';

const getAllMembers= () => {
    return axios.get(url)
}




export default {getAllMembers}