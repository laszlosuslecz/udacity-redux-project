import _ from 'lodash'
import { FETCH_COMMENTS } from '../actions'

function comments (state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS: 
      return _.mapKeys(action.payload, 'id')
    default:
      return state
  }
}

export default comments