import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div')
  container.className = 'container'
  container.className = 'o-container'
  container.className = 'o-container--map'

  ReactDOM.render(
    <App/>,
    document.body.appendChild(container),
  )
})
