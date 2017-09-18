import { getPosts } from '../api_methods'

export const FETCH_POSTS = 'fetch_posts'

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: getPosts()
  }
}