import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from './Header'

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
        <li key={post.id} className="post-card">
          <Link className="post-title" to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
          <div>
            <div className="post-data-item">{`posted by: ${post.author}`}</div>
            <div className="post-data-item">{`score: ${post.voteScore}`}</div>
          </div>
          <div className="btn-vote">
            <button
              className="btn-updown"
              onClick={() => votePost(post.id, 'upVote')}
              >upvote</button>
            <button
              className="btn-updown"
              onClick={() => votePost(post.id, 'downVote')}
              >downvote</button>
          </div>
        </li>
      )
    })
  }

  render() {

    const { category } = this.props.match.params

    return ( 
      <div className="main-container">
        <Header />
        <div>
          <Link to='/' className="route btn btn-router">Back to the main page</Link>
        </div>
        <div className="main">
          <h2>{`posts in category: ${category}`}</h2>
          <ul>{ this.renderCategoryPostList() }</ul>
        </div>
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
