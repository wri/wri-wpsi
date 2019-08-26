require 'test_helper'

class Admin::LayersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @layer = layers(:conflict_one)
  end

  test 'should get index' do
    get admin_layers_url
    assert_response :success
  end

  test 'should get new' do
    get new_admin_layer_url
    assert_response :success
  end

  test 'should create layer' do
    assert_difference('Layer.count') do
      post admin_layers_url, params: {
        layer: {
          name: @layer.name,
          short_description: @layer.short_description,
          long_description: @layer.long_description,
          layer_id: 'some_unique_id',
          dataset_id: @layer.dataset_id,
          category_ids: @layer.categories.map(&:id),
          source_name: @layer.source_name,
          source_url: @layer.source_url,
          source_description: @layer.source_description,
          published: @layer.published,
          primary: @layer.primary,
        },
      }
    end

    assert_redirected_to admin_layer_url(Layer.last)
  end

  test 'should show layer' do
    get admin_layer_url(@layer)
    assert_response :success
  end

  test 'should get edit' do
    get edit_admin_layer_url(@layer)
    assert_response :success
  end

  test 'should update layer' do
    patch admin_layer_url(@layer), params: {
      layer: {
        name: @layer.name,
        short_description: @layer.short_description,
        long_description: @layer.long_description,
        layer_id: 'some_unique_id',
        dataset_id: @layer.dataset_id,
        category_ids: @layer.categories.map(&:id),
        source_name: @layer.source_name,
        source_url: @layer.source_url,
        source_description: @layer.source_description,
        published: @layer.published,
        primary: @layer.primary,
      },
    }
    assert_redirected_to admin_layer_url(@layer)
  end

  test 'should destroy layer' do
    assert_difference('Layer.count', -1) do
      delete admin_layer_url(@layer)
    end

    assert_redirected_to admin_layers_url
  end
end
