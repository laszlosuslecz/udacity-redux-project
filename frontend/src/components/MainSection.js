import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from './Header'

import { 
  fetchPosts,
  votePost
 } from '../actions/action_posts'


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
        <li key={post.id} className="post-card">
          <Link className="post-title" to={`/${post.category}/${post.id}`}><h3>{post.title}</h3></Link>
          <div>
            <div className="post-data-item">{`posted by: ${post.author}`}</div>
            <div className="post-data-item">{`score: ${post.voteScore}`}</div>
            <div className="post-data-item">number of comments: </div>
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
    console.log(this.props.posts)
    return (
      <div className="main-container">
        <Header pageHeader='posts'/>
        <div>
          <Link to="/posts/new" className="route btn btn-router">
            add new post
          </Link>
        </div>
        <div className="aside">
          <Categories />
        </div>
        <div className="main">
          <span>Sort by <button>Date</button><button>Score</button></span> 
          <div className="post-container">
            <ul>{ this.renderPostList() }</ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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