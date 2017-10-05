import React from 'react'

const Header = (props) => (
    <div className="header"> 
      <h1>readable</h1>
      <h3>{props.pageHeader}</h3>
    </div>
)

export default Header