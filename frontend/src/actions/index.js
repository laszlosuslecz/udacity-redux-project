import { getPosts } from '../api_methods'
import { createPost } from '../api_methods'
import { getPostDetail } from '../api_methods'

import { getCategories } from '../api_methods'

import { getComments } from '../api_methods'

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_NEW_POST = 'create_new_post'
export const FETCH_GIVEN_POST = 'fetch_given_post'

export const FETCH_CATEGORIES = 'fetch_categories'

export const FETCH_COMMENTS = 'fetch_comments'

//Comments
export function fetchComments(postId) {
  return {
    type: FETCH_COMMENTS,
    payload: getComments(postId)
  }
}

//Categories
export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES,
    payload: getCategories()
  }
}


//Posts
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

export function fetchGivenPost(id) {
  return {
    type: FETCH_GIVEN_POST,
    payload: getPostDetail(id)
  }
}

