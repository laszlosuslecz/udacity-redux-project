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

export const createPost = (post) =>
  fetch(`${url}/posts`, {
    method: 'POST', 
    headers,
    body: JSON.stringify({
      ...post,
      id: uuid(),
      timestamp: Date.now()
    })
  }).then(res => res.json())