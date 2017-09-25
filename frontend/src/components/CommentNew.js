import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createNewComment } from '../actions'

class CommentNew extends Component {

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
    const { category, id } = this.props.match.params
    this.props.createNewComment(id, values, () => {
      this.props.history.push(`/${category}/${id}`)  
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
        <h1>create a new comment</h1>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="body" component={ this.renderTextarea } label='comment' placeholder='comment'
          />
          <Field
            name="author" component={ this.renderInput } label='author' placeholder='name'
          />
          <button type="submit">Submit</button>
        </form>
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

export default reduxForm({
  validate,
  form: 'new-comment'
})(
  connect(null, { createNewComment })(CommentNew)
)