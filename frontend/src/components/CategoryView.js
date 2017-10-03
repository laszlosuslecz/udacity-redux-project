import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { 
  fetchCategoryPosts,
  votePost 
} from '../actions/action_posts'

class CategoryView extends Component {

  componentDidMount() {
    const { category } = this.props.match.params
    this.props.fetchCategoryPosts(category)
  }

  renderCategoryPostList() {
    const { posts, votePost } = this.props

    return _.map(posts, post => {
      return (
        <li key={post.id}>
          <Link to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
          <div>{`Posted by: ${post.author}`}</div>
          <div>{`Score: ${post.voteScore}`}</div>
          <button
            onClick={() => votePost(post.id, 'upVote')}
          >Upvote</button>
          <button
            onClick={() => votePost(post.id, 'downVote')}
          >Downvote</button>
        </li>
      )
    })
  }

  render() {
    return ( 
      <div>
        <Link to='/'>Back to the main page</Link>
        <h2>Posts in your selected category</h2>
        <ul>{ this.renderCategoryPostList() }</ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { 
  fetchCategoryPosts,
  votePost
})(CategoryView)
