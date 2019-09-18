require 'application_system_test_case'

class LayersTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @layer = layers(:employment_in_agriculture)
  end

  test 'visiting the index' do
    visit admin_layers_url
    assert_selector 'h2', text: 'Listing layers'
  end

  test 'creating a Layer' do
    visit admin_layers_url
    click_on 'New Layer'

    fill_in 'Name', with: @layer.name
    fill_in 'Short description', with: @layer.short_description
    tinymce_fill_in 'layer_long_description', with: @layer.long_description
    fill_in 'Layer', with: 'some_unique_id'
    fill_in 'Dataset', with: @layer.dataset_id
    select @layer.categories.first.title, from: 'Categories'
    fill_in 'Source name', with: @layer.source_name
    fill_in 'Source url', with: @layer.source_url
    fill_in 'Source description', with: @layer.source_description
    fill_in 'Widget spec', with: @layer.widget_spec
    check 'Published' if @layer.published
    check 'Primary' if @layer.primary
    click_on 'Create Layer'

    assert_text 'Layer was successfully created'
    click_on 'Back'
  end

  test 'updating a Layer' do
    visit admin_layers_url

    within 'table' do
      click_on 'Edit', match: :first
    end

    fill_in 'Name', with: @layer.name
    fill_in 'Short description', with: @layer.short_description
    tinymce_fill_in 'layer_long_description', with: 'some_test_long_description'
    fill_in 'Layer', with: 'some_unique_id'
    fill_in 'Dataset', with: @layer.dataset_id
    select @layer.categories.first.title, from: 'Categories'
    fill_in 'Source name', with: @layer.source_name
    fill_in 'Source url', with: @layer.source_url
    fill_in 'Source description', with: @layer.source_description
    fill_in 'Widget spec', with: @layer.widget_spec
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
