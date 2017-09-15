import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainSection from './components/MainSection'
import CategoryView from './components/CategoryView'
import PostDetail from './components/PostDetail'
import PostNew from './components/PostNew'
import PostEdit from './components/PostEdit'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <MainSection />
        )}/>
        <Route exact path='/:category' component={ CategoryView } />
        <Route exact path='/:category/:post_id' component={ PostDetail } />
        <Route exact path='/posts/new' component={ PostNew } />
        <Route exact path='/posts/edit' component={ PostEdit } />
      </div>
    )
  }
}

export default App
