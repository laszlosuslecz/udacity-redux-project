import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { 
  fetchGivenPost,
  fetchComments,
  votePost,
  voteComment,
  deletePost
} from '../actions'

class PostDetail extends Component {


  componentDidMount() {  
      const { id } = this.props.match.params
      this.props.fetchGivenPost(id)
      this.props.fetchComments(id)
  }
  
  onPostVoteClick() {
    const { id } = this.props.match.params
    this.props.votePost(id, 'upVote')
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
           <button
            onClick={ this.onPostVoteClick.bind(this) }
           >Upvote</button>
           <button>Downvote</button>           
           <Link to={`/posts/edit/${post.id}`}><button>Edit</button></Link>         
           <button
            onClick={ this.onDeleteClick.bind(this) }
           >Delete</button>
           <div>{`Posted by: ${post.author}`}</div>
           <div>{`Score: ${post.voteScore}`}</div>
           <span>Number of comments:</span>
           <div>{post.body}</div>
         </div>
    )
  }

  renderCommentList() {
    const { comments, post, voteComment } = this.props
    
    if (!comments) {
      return (<div>Loading...</div>)
    }
    
    return _.map(comments, (comment, id) => {
      return (
        <li key={comment.id}>
          <div>{comment.body}</div>
          <div>{comment.author}</div>
          <div>{`Score: ${comment.voteScore}`}</div>
          <button
            onClick={() => voteComment(comment.id, 'upVote')}
          >Upvote</button>
          <button
            onClick={() => voteComment(comment.id, 'downVote')}
          >Downvote</button>
          <Link to={`/comment/edit/${comment.id}/${post.category}`}><button>Edit / Delete</button></Link> 
        </li>
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
        <div>{ this.renderPostDetails() }</div>
        <div>
          <h4>Comments</h4>
          <ul>{ this.renderCommentList() }</ul>
          <Link to={`/commentto/${post.id}/${post.category}`}><button>Add comment</button></Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    post: state.posts[ownProps.match.params.id], 
    comments: _.filter(state.comments, {'parentId': ownProps.match.params.id})
  }
}

export default connect(mapStateToProps, { 
  fetchGivenPost,
  fetchComments,
  votePost,
  voteComment,
  deletePost
})(PostDetail)