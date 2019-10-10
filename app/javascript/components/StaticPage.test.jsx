import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import StaticPage from 'components/StaticPage'

const page = {
  name: 'Test name',
  slug: 'Test slug',
  content: 'Test content',
}
const component = shallow(<StaticPage page={page} />)

it('renders correctly', () => {
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})
