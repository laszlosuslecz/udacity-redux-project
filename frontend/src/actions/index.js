import { getPosts } from '../api_methods'
import { createPost } from '../api_methods'

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_NEW_POST = 'create_new_post'

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: getPosts()
  }
}

export function createNewPost(values, callback) {
  return {
    type: CREATE_NEW_POST,
    payload: createPost(values, callback)
  }
}