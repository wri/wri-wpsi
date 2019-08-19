require 'test_helper'

class Admin::LayersControllerTest < ActionDispatch::IntegrationTest
  setup do
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
          category: @layer.category,
          dataset_id: @layer.dataset_id,
          description: @layer.description,
          layer_id: 'some_unique_id',
          name: @layer.name,
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
        category: @layer.category,
        dataset_id: @layer.dataset_id,
        description: @layer.description,
        layer_id: @layer.layer_id,
        name: @layer.name,
        primary: @layer.primary,
        published: @layer.published,
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
