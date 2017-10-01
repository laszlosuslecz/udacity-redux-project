import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { 
  fetchPosts,
  votePost
 } from '../actions'


import Categories from './Categories'

class MainSection extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  renderPostList() {
    const { posts, votePost } = this.props
    
    if (!posts) {
      return (<div>Loading...</div>)
    }
    
    return _.map(posts, post => {
      return (
        <li key={post.id}>
          <Link to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
          <div>{`Posted by: ${post.author}`}</div>
          <div>{`Score: ${post.voteScore}`}</div>
          <div>Number of comments: </div>
          <button
            className="btn btn-content"
            onClick={() => votePost(post.id, 'upVote')}
          >Upvote</button>
          <button
            className="btn btn-content"
            onClick={() => votePost(post.id, 'downVote')}
          >Downvote</button>
        </li>
      )
    })
  }

  render() {
    console.log(this.props.posts)
    return (
      <div className="main-container">
        <div>
          <Link to="/posts/new" className="route btn btn-router">
            add new post
          </Link>
        </div>
        <div className="header"> 
          <h1>Readable</h1>
        </div>
        <div className="aside">
          <Categories />
        </div>
        <div className="main">
          <h3>Posts</h3>
          <span>Sort by <button>Date</button><button>Score</button></span>
          <ul>{ this.renderPostList() }</ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
  //  posts: state.posts,
    posts: _(state.posts)
      .sortBy('voteScore')
      .value()
      .reverse()
  }
}

export default connect(mapStateToProps, { 
  fetchPosts,
  votePost 
})(MainSection)