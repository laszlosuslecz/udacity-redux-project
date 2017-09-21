import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGivenPost } from '../actions'


class PostDetail extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchGivenPost(id)
  }

  render() {

    const { post } = this.props

    if(!post) {
      return <div>Loading...</div>
    }

    return ( 
      <div>
        <h1>show the selected post</h1>
        <h3>{ post.title }</h3>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchGivenPost })(PostDetail)