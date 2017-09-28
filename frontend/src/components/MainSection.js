import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import { Link } from 'react-router-dom'

import Categories from './Categories'

class MainSection extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  renderPostList() {
    const { posts } = this.props
   
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
          <button>Upvote</button>
          <button>Downvote</button>
        </li>
      )
    })
  }

  render() {
    console.log(this.props.posts)
    return (
      <div>
        <div>
          <Link to="/posts/new">
            Add new post!
          </Link>
        </div> 
        <h1>Reabadle</h1>
        <div>
          <Categories />
        </div>
        <div>
          <h3>Posts</h3>
          <span>Sort by <button>Date</button><button>Score</button></span>
          <ul>{ this.renderPostList() }</ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(MainSection)