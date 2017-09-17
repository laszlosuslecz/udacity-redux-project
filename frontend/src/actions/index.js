//import { getPosts } from '../api_methods'

export const FETCH_POSTS = 'fetch_posts'

const url = 'http://localhost:3001'

const token = 'laszlo'

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

const getPosts = () => 
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())


export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: getPosts
  }
}