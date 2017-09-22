import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import posts from './reducer_posts'
import categories from './reducer_categories'

const rootReducer = combineReducers({ 
  posts,
  categories,
  form: formReducer
})

export default rootReducer