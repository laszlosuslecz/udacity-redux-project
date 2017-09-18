import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

class PostNew extends Component {
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
            name="title" component='input' type='text' placeholder='title'
          />
          <Field
            name="category" component='select'>
            <option value='react'>React</option>
            <option value='redux'>Redux</option>
            <option value='udacity'>Udacity</option>
          </Field>
          <Field
            name="body" component='textarea' type='text' placeholder='content'
          />
          <Field
            name="author" component='input' type='text' placeholder='name'
          />
          <button type="submit">Submit</button>
        </form>
      </div>  
    )
  }
}

export default reduxForm({
  form: 'new-post'
})(PostNew)