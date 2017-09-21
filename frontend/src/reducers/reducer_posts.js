import _ from 'lodash'
import { FETCH_POSTS } from '../actions'
import { FETCH_GIVEN_POST } from '../actions'

function posts (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload, 'id')
    case FETCH_GIVEN_POST:
      return { ...state, [action.payload.id]: action.payload }
    default:
      return state
  }
}



export default posts