import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import { Link } from 'react-router-dom'

import Categories from './Categories'

class MainSection extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
 //   console.log(this.props.posts)
    return (
      <div>
        <div>
          <Link to="/posts/new">
            Add new post!
          </Link>
        </div> 
        <h1>This is the main page</h1>
        <div>
          <Categories />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(MainSection)