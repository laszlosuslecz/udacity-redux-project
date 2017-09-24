import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCategoryPosts } from '../actions'

class CategoryView extends Component {

  componentDidMount() {
    const { category } = this.props.match.params
    this.props.fetchCategoryPosts(category)
  }

  renderCategoryPostList() {
    const { posts } = this.props

    return _.map(posts, post => {
      return (
        <li key={post.id}>
          <Link to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
          <div>{`Posted by: ${post.author}`}</div>
          <div>{`Score: ${post.voteScore}`}</div>
          <button>Upvote</button>
          <button>Downvote</button>
          <button>Edit</button>
          <button>Delete</button>
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
  fetchCategoryPosts
})(CategoryView)
