import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MapSideBar from 'components/MapSideBar'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const component = renderer.create(
    <BrowserRouter>
      <MapSideBar
        activeLayers={[]}
        maskLayers={[{
          id: '123',
          name: 'Highlight areas of water stress',
          categories: [],
        }]}
        setModalOpen={() => null}
        onRemoveLayer={() => null}
        onToggleLayer={() => null}
      />
    </BrowserRouter>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
