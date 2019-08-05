import React from 'react'
import MapSideBar from 'components/MapSideBar'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const component = renderer.create(
    <MapSideBar
      activeLayers={[]}
      setModalOpen={() => console.log('nothing')}
    />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
