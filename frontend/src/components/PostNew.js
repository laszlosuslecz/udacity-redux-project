import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

class PostNew extends Component {

  renderInput(field) {
    return (
      <div>
        <label>{ field.label }</label>
        <input { ...field.input } placeholder={ field.placeholder } type='text' />
        {field.meta.error}
      </div>
    )
  }

  renderSelect(field) {
    return (
      <div>
        <label>{ field.label }</label>
        <select { ...field.input } value={ field.value } />
      </div>
    )
  }

  renderTextarea(field) {
    return (
      <div>
        <label>{ field.label }</label>
        <textarea { ...field.input } placeholder={ field.placeholder } type='text' />
        {field.meta.error}
      </div>
    )
  }

  render() {
    return ( 
      <div>
        <div>
          <Link to="/">
            Back to main page!
          </Link>
        </div> 
        <h1>create a new post</h1>
        <form>
          <Field
            name="title" component={ this.renderInput } label='title' type='text' placeholder='title'
          />
          <Field
            name="category" component='select' label='category'>
            <option value='react'>React</option>
            <option value='redux'>Redux</option>
            <option value='udacity'>Udacity</option>
          </Field>
          <Field
            name="body" component={ this.renderTextarea } label='content' placeholder='content'
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

  if(!values.title) {
    errors.title = 'Please enter a title'
  } 
 /* if(!values.category) {
    errors.category = 'Please choose a category'
  } */
  if(!values.body) {
    errors.category = 'Please enter post content'
  }
  if(!values.author) {
    errors.author = 'Please enter your name'
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'new-post'
})(PostNew)