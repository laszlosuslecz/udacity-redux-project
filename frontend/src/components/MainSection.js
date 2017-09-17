import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class MainSection extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    console.log(this.props.posts)
    return ( 
      <h1>This is the main page</h1>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(MainSection)