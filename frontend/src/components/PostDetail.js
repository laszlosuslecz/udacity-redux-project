import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { 
  fetchGivenPost,
  fetchComments,
  deletePost
} from '../actions'

class PostDetail extends Component {

  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params
      this.props.fetchGivenPost(id)
      this.props.fetchComments(id)
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  renderPostDetails() {
   
    const { post } = this.props
    
    return (
         <div>
           <h3>{post.title}</h3>
           <div>{`Posted by: ${post.author}`}</div>
           <div>{`Score: ${post.voteScore}`}</div>
           <button>Upvote</button>
           <button>Downvote</button>
           <button>Edit</button>
           <button
            onClick={ this.onDeleteClick.bind(this) }
           >Delete</button>
           <div>{post.body}</div>
         </div>
    )
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
        <Link to='/'>Back to the main page</Link>
        <h1>show the selected post</h1>
        <div>{ this.renderPostDetails() }</div>
        <div>
          <h4>Comments</h4>
          <ul>{ this.renderCommentList() }</ul>
          <button>Add new comment</button>
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
  fetchComments,
  deletePost
})(PostDetail)