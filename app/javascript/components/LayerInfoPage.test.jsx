import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import LayerInfoPage from 'components/LayerInfoPage'
import renderer from 'react-test-renderer'

const layers = [
  {
    id: '1',
    name: 'Test name',
    long_description: 'Test description',
  },
  {
    id: '2',
    name: 'Test name',
  }
]

const checkRenderWithLayer = (layerId) => {
  const component = renderer.create(
    <MemoryRouter initialEntries={[`/map/learn_more/${layerId}`]}>
      <Route
        path='/map/learn_more/:layerId'
        render={() => <LayerInfoPage layers={layers} />}
      />
    </MemoryRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}

it('renders correctly', () => {
  checkRenderWithLayer('1')
})

it('renders correctly without a description too', () => {
  checkRenderWithLayer('2')
})
