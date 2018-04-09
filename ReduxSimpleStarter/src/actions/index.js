import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export async function createPost(values, callback) {
    const request = await axios.post(`${ROOT_URL}/posts`, values);
    callback();

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export async function deletePost(id, callback) {
    const request = await axios.delete(`${ROOT_URL}/posts/${id}`);
    callback();

    return {
        type: DELETE_POST,
        payload: id
    };
}