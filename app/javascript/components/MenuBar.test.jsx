import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MenuBar from 'components/MenuBar'
import renderer from 'react-test-renderer'

it('renders correctly when inside a router', () => {
  const component = renderer.create(
    <BrowserRouter>
      <MenuBar></MenuBar>
    </BrowserRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
