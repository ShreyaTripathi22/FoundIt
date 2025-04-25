import axios from "axios";

const URL = "http://localhost:3000"

export async function getPosts() {
    const response = await axios.get(`${URL}/posts`)

    if(response.status === 200){
        return response.data
    }else{
        return
    }
    
}

export async function getPost(id) {
    const response = await axios.get(`${URL}/posts/${id}`)

    if(response.status === 200){
        return response.data
    }else{
        return
    }
    
}
export async function createPost(post) {
    const response = await axios.post(`${URL}/posts`, post)
    return response
 
}


export async function deletePost(id) {
    const response = await axios.delete(`${URL}/posts/${id}`)
    return response
 
}

//USER FUNCTIONS

export async function getUser(id) {
    const response = await axios.get(`${URL}/users/${id}`)

    if(response.status === 200){
        return response.data
    }else{
        return
    }
    
}
export async function createUsers(user) {
    const response = await axios.post(`${URL}/users`, user)
    return response
 
}


export async function deleteUser(id) {
    const response = await axios.delete(`${URL}/users/${id}`)
    return response
 
}

export async function verifyUser(user){
    const response = await axios.post(`${URL}/users/login`,user)
    if(response.data.success){
        return response.data.token
    }else{
        return
    }
}