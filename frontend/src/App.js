import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainSection from './components/MainSection'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <MainSection />
        )}/>
      </div>
    )
  }
}

export default App
