import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGivenPost } from '../actions'
import { fetchComments } from '../actions'


class PostDetail extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchGivenPost(id)
    this.props.fetchComments(id)
  }

  renderCommentList() {
    const { comments } = this.props
    console.log(this.props.comments)
    
    if (!comments) {
      return (<div>Loading...</div>)
    }
    
    return _.map(comments, comment => {
      return (
        <li key={comment.id}>{comment.body}</li>
      )
    })
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
        <div>
          <ul>{ this.renderCommentList() }</ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return { 
  post: state.posts[ownProps.match.params.id], 
  comments: state.comments
  }
}

export default connect(mapStateToProps, { 
  fetchGivenPost,
  fetchComments
})(PostDetail)