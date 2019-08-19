require 'application_system_test_case'

class MapTest < ApplicationSystemTestCase
  test 'visiting the map' do
    visit map_url
    assert_selector '#top-banner', text: 'Water, Peace & Security'
  end

  test 'adding a dataset' do
    layer =  layers(:food_one)

    visit map_url
    click_button 'Add dataset'
    click_button layer.category.title

    within '#modal' do
      assert_selector 'h2', text: layer.name
      assert_text layer.description
      add_button = find("#layer-#{layer.layer_id}")
      add_button.click
      click_button 'Close'
    end

    within '#sidebar' do
      assert_selector 'h2', text: layer.name
    end
  end
end
