import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { 
  editPost,
  fetchGivenPost 
} from '../actions'

class PostEdit extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchGivenPost(id)
    console.log(this.props.post)
    this.handleInitialize()
  }

  handleInitialize() {
    if (this.props.post) {
      const originalPost = {
        'title': this.props.post.title,
        'body': this.props.post.body,
        'author': this.props.post.author
      }

      this.props.initialize(originalPost)
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
    const { id } = this.props.match.params  
    this.props.editPost(id, values, () => {
      this.props.history.push('/')  
    })
    console.log(values)  
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
        <h1>Edit post</h1>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="title" component={ this.renderInput } label='title' type='text' placeholder='title'
          />
          <Field
            name="body" component={ this.renderTextarea } label='content' placeholder='content'
          />
          <Field
            name="author" component={ this.renderInput } label='author' placeholder='name'
          />
          <button type="submit">Update</button>
        </form>
        <Link to="/">
            Back to main page without updating post!
          </Link>
      </div>  
    )
  }
}

function validate(values) {
  const errors = {}

  if(!values.title) {
    errors.title = 'Please enter a title'
  } 
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
    post: state.posts[ownProps.match.params.id]
  }
}

export default reduxForm({
  validate,
  form: 'edit-post'
})(
  connect(mapStateToProps, { editPost, fetchGivenPost })(PostEdit)
)