//import axios from 'axios'

const url = 'http://localhost:3001'

const token = 'laszlo'

const headers = {
  'Authorization': token
}

export const getPosts = () => 
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
  
