require 'application_system_test_case'

class LayersTest < ApplicationSystemTestCase
  setup do
    @layer = layers(:food_one)
  end

  test 'visiting the index' do
    visit admin_layers_url
    assert_selector 'h1', text: 'Listing layers'
  end

  test 'creating a Layer' do
    visit admin_layers_url
    click_on 'New Layer'

    fill_in 'Name', with: @layer.name
    fill_in 'Short description', with: @layer.short_description
    fill_in 'Long description', with: @layer.long_description
    fill_in 'Layer', with: 'some_unique_id'
    fill_in 'Dataset', with: @layer.dataset_id
    select @layer.categories.first.title, from: 'Categories'
    fill_in 'Source name', with: @layer.source_name
    fill_in 'Source url', with: @layer.source_url
    fill_in 'Source description', with: @layer.source_description
    check 'Published' if @layer.published
    check 'Primary' if @layer.primary
    click_on 'Create Layer'

    assert_text 'Layer was successfully created'
    click_on 'Back'
  end

  test 'updating a Layer' do
    visit admin_layers_url
    click_on 'Edit', match: :first

    fill_in 'Name', with: @layer.name
    fill_in 'Short description', with: @layer.short_description
    fill_in 'Long description', with: @layer.long_description
    fill_in 'Layer', with: 'some_unique_id'
    fill_in 'Dataset', with: @layer.dataset_id
    select @layer.categories.first.title, from: 'Categories'
    fill_in 'Source name', with: @layer.source_name
    fill_in 'Source url', with: @layer.source_url
    fill_in 'Source description', with: @layer.source_description
    check 'Published' if @layer.published
    check 'Primary' if @layer.primary
    click_on 'Update Layer'

    assert_text 'Layer was successfully updated'
    click_on 'Back'
  end

  test 'destroying a Layer' do
    visit admin_layers_url
    page.accept_confirm do
      click_on 'Delete', match: :first
    end

    assert_text 'Layer was successfully deleted'
  end
end
