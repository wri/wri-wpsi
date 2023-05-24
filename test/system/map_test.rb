require 'application_system_test_case'

class MapTest < ApplicationSystemTestCase
  test 'adding a dataset' do
    layer = layers(:employment_in_agriculture)

    visit map_url

    within '#sideBar > header' do
      click_button 'Add dataset'
    end

    within '#modal' do
      click_button layer.categories.first.title

      assert_text layer.categories.first.description
      assert_selector 'h2', text: layer.name
      assert_text layer.short_description

      add_button = find("#layer-#{layer.layer_id}")
      add_button.click
      close_btn = find("button[aria-label='Close']")
      close_btn.click
    end
  end

  test 'viewing a dataset\'s long description' do
    mask_layer = layers(:mask)
    conflict_layer = layers(:risk_of_conflict)

    visit map_url

    within '#sideBarContent' do
      assert_selector 'h2', text: conflict_layer.name
      first('div').click_link 'Learn more'
    end

    within '#modal > header' do
      assert_selector 'h1', text: mask_layer.name.upcase
      # assert_text mask_layer.long_description
      close_btn = find("button[aria-label='Close']")
      close_btn.click
    end

    assert_selector 'a > img[alt="WPS logo"]'
  end
end
