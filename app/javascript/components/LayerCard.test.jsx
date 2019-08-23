import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import LayerCard from 'components/LayerCard'
import LayerTags from 'components/LayerTags'
import renderer from 'react-test-renderer'

const layer = {
  id: '123',
  name: 'My test layer',
  category_slugs: ['water', 'peace', 'security'],
  source_name: 'Wikipedia',
  source_url: 'www.wikipedia.org',
}

const component = shallow(<LayerCard layer={layer} />)

it('renders correctly', () => {
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

it('renders a <LayerTags /> component with three tags', () => {
  expect(
    component.containsMatchingElement(
      <LayerTags layer={layer} />
    )
  ).toBeTruthy()
})

it('renders the source name as a link', () => {
  const link = component.find('a')
  expect(link.text()).toEqual('Wikipedia')
  expect(link.props().href).toEqual('www.wikipedia.org')
})
