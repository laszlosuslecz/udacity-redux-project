import React, { Component } from 'react'
import { Field, reduxForm, initialize } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from './Header'

import { 
  editPost,
  fetchGivenPost 
} from '../actions/action_posts'

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
        <input { ...field.input } placeholder={ field.placeholder } type='text' className='input' />
        <div className='text-danger'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  renderTextarea(field) {
    return (
      <div>
        <label>{ field.label }</label>
        <textarea { ...field.input } placeholder={ field.placeholder } type='text' className='input input-post' />
        <div className='text-danger'>
          {field.meta.touched ? field.meta.error : ''}
        </div>
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

    const submitButtonStyle = {
      padding: '.8em .8em', 
      backgroundColor: 'lightskyblue',
      color: 'white',
      border: '1px lightgray solid',
      borderRadius: '5px', 
      display: 'block',
      margin: 'auto'
    }

    return ( 
      <div className="main-container">
        <Header />
        <div>
          <Link to="/" className="route btn btn-router">
            back to main page without updating
          </Link>
        </div>
        <div className="main"> 
        <h1>edit post</h1>
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
          <button type="submit" style={submitButtonStyle}>Update</button>
        </form>
        </div>
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