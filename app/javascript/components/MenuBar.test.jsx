import React from 'react'
import { BrowserRouter, NavLink } from 'react-router-dom'
import { shallow } from 'enzyme';
import MenuBar from 'components/MenuBar'
import renderer from 'react-test-renderer'

describe('<MenuBar />', () => {
  it('renders correctly when inside a router', () => {
    const component = renderer.create(
      <BrowserRouter>
        <MenuBar></MenuBar>
      </BrowserRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders three <NavLink /> components', () => {
    const component = shallow(<MenuBar />)
    expect(component.find(NavLink)).toHaveLength(3)
  })
})
