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
      </div>  
    )
  }
}

export default reduxForm({
  form: 'new-post'
})(PostNew)