import uuid from 'uuid'

const url = 'http://localhost:3001'

const token = 'laszlo'

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export const getPosts = () => 
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())

export const createPost = (post, callback) =>
  fetch(`${url}/posts`, {
    method: 'POST', 
    headers,
    body: JSON.stringify({
      ...post,
      id: uuid(),
      timestamp: Date.now()
    })
  })
  .then(res => res.json())
  .then(() => callback())

export const getPostDetail = (postId) =>
  fetch(`${url}/posts/${postId}`, { headers })
    .then(res => res.json())

//fetch the category list
export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())

//fetch comments to given post
export const getComments = (postId) =>
  fetch(`${url}/posts/${postId}/comments`, { headers })
    .then(res => res.json)