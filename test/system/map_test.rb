require 'application_system_test_case'

class MapTest < ApplicationSystemTestCase
  test 'visiting the map' do
    visit map_url
    assert_selector '#top-banner', text: 'Water, Peace & Security'
  end

  test 'adding a dataset' do
    layer = layers(:employment_in_agriculture)

    visit map_url

    within '#sidebar > header' do
      click_button 'Add dataset'
    end

    within '#modal' do
      click_button layer.categories.first.title

      assert_text layer.categories.first.description
      assert_selector 'h2', text: layer.name
      assert_text layer.short_description

      add_button = find("#layer-#{layer.layer_id}")
      add_button.click
      click_button 'Close'
    end
  end

  test 'viewing a dataset\'s long description' do
    layer = layers(:risk_of_conflict)

    visit map_url

    within '#sidebar' do
      assert_selector 'h2', text: layer.name
      click_link 'Learn more'
    end

    within '#modal > header' do
      assert_selector 'h1', text: layer.name
      assert_text layer.long_description
      click_button 'Close'
    end

    assert_selector '#top-banner', text: 'Water, Peace & Security'
  end
end
