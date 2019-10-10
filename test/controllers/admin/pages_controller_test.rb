require 'test_helper'

class Admin::PagesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @page = create(:page)
  end

  test 'should get index' do
    get admin_pages_url
    assert_response :success
  end

  test 'should get new' do
    get new_admin_page_url
    assert_response :success
  end

  test 'should create page' do
    assert_difference('Page.count') do
      post admin_pages_url, params: {
        page: {
          content: @page.content,
          name: @page.name,
          slug: 'some_unique_slug',
        },
      }
    end

    assert_redirected_to admin_page_url(Page.last)
  end

  test 'should show page' do
    get admin_page_url(@page)
    assert_response :success
  end

  test 'should get edit' do
    get edit_admin_page_url(@page)
    assert_response :success
  end

  test 'should update page' do
    patch admin_page_url(@page), params: {
      page: {
        content: @page.content,
        name: @page.name,
        slug: @page.slug,
      },
    }
    assert_redirected_to admin_page_url(@page)
  end

  test 'should destroy page' do
    assert_difference('Page.count', -1) do
      delete admin_page_url(@page)
    end

    assert_redirected_to admin_pages_url
  end
end
