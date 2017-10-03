import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { 
  editComment,
  fetchGivenComment,
  deleteComment 
} from '../actions/action_comments'

class CommentEdit extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchGivenComment(id)
    this.handleInitialize()
  }

  onDeleteClick() {
    const { id, category } = this.props.match.params
    const { parentId } = this.props.comment
    this.props.deleteComment(id, () => {
      this.props.history.push(`/${category}/${parentId}`)
    })
  }

  handleInitialize() {
    if (this.props.comment) {
      const originalComment = {
        'body': this.props.comment.body,
        'author': this.props.comment.author
      }
      this.props.initialize(originalComment)
    }
  }

  renderInput(field) {
    return (
      <div>
        <label>{ field.label }</label>
        <input { ...field.input } placeholder={ field.placeholder } type='text' />
        {field.meta.touched ? field.meta.error : ''}
      </div>
    )
  }

  renderTextarea(field) {
    return (
      <div>
        <label>{ field.label }</label>
        <textarea { ...field.input } placeholder={ field.placeholder } type='text' />
        {field.meta.touched ? field.meta.error : ''}
      </div>
    )
  }

  onSubmit(values) {
    const { id, category } = this.props.match.params
    const { parentId } = this.props.comment
    this.props.editComment(id, values, () => {
      this.props.history.push(`/${category}/${parentId}`)  
    }) 
  }

  render() {

    const { handleSubmit } = this.props

    return ( 
      <div>
        <div>
          <Link to="/">
            Back to main page!
          </Link>
        </div> 
        <h1>Edit comment</h1>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="body" component={ this.renderTextarea } label='comment' placeholder='comment'
          />
          <Field
            name="author" component={ this.renderInput } label='author' placeholder='name'
          />
          <button type="submit">Update</button>
        </form>
        <button
          onClick={ this.onDeleteClick.bind(this) }
        >Delete</button>
        <Link to="/">
            Back to main page without updating comment!
        </Link>
      </div>  
    )
  }
}

function validate(values) {
  const errors = {}
 
  if(!values.body) {
    errors.body = 'Please enter post content'
  }
  if(!values.author) {
    errors.author = 'Please enter your name'
  }

  return errors
}

function mapStateToProps(state, ownProps) {
  return {
    comment: state.comments[ownProps.match.params.id]
  }
}

export default reduxForm({
  validate,
  form: 'edit-comment'
})(
  connect(mapStateToProps, { editComment, fetchGivenComment, deleteComment })(CommentEdit)
)