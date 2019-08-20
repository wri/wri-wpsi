require 'test_helper'

class Admin::CategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @category = categories(:community)
  end

  test 'should get index' do
    get admin_categories_url
    assert_response :success
  end

  test 'should get new' do
    get new_admin_category_url
    assert_response :success
  end

  test 'should create category' do
    assert_difference('Category.count') do
      post admin_categories_url, params: {
        category: {
          description: @category.description,
          slug: 'some_unique_slug',
          title: @category.title,
        },
      }
    end

    assert_redirected_to admin_category_url(Category.last)
  end

  test 'should show category' do
    get admin_category_url(@category)
    assert_response :success
  end

  test 'should get edit' do
    get edit_admin_category_url(@category)
    assert_response :success
  end

  test 'should update category' do
    patch admin_category_url(@category), params: {
      category: {
        description: @category.description,
        slug: @category.slug,
        title: @category.title,
      },
    }
    assert_redirected_to admin_category_url(@category)
  end

  test 'should destroy category' do
    @category.layers.destroy_all

    assert_difference('Category.count', -1) do
      delete admin_category_url(@category)
    end

    assert_redirected_to admin_categories_url
  end
end
