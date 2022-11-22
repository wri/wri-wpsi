import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import { ErrorHandler } from "util/ErrorHandler";

const Root = () => {
  return <ErrorHandler><App /></ErrorHandler>
}

document.addEventListener('DOMContentLoaded', () => {
  let container = document.getElementById('map-container')
  if (!container) {
    container = document.createElement('div')
    container.className = 'container'
    container.className = 'o-container'
    container.className = 'o-container--map'
    document.body.appendChild(container)
  }

  ReactDOM.render(
    <Root/>,
    container
  )
})
