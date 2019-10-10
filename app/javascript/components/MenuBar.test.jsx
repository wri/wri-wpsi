import React from 'react'
import { MemoryRouter, NavLink } from 'react-router-dom'
import { shallow } from 'enzyme'
import MenuBar from 'components/MenuBar'
import renderer from 'react-test-renderer'

global.fetch = jest.fn(() => Promise.resolve());

const pages = [
  {
    name: 'Methodology',
    slug: 'methodology',
    content: 'Test content',
  },
  {
    name: 'About Us',
    slug: 'about',
    content: 'Test content',
  },
]

describe('<MenuBar />', () => {
  it('renders correctly when inside a router', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={[`/map`]}>
        <MenuBar pages={pages} />
      </MemoryRouter>
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders three <NavLink /> components', () => {
    const component = shallow(<MenuBar pages={pages} />).dive()
    expect(component.find(NavLink)).toHaveLength(3)
  })
})
