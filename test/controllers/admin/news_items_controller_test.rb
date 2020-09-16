require 'test_helper'

class NewsItemsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @news_item = news_items(:iraq)
  end

  test 'should get index' do
    get admin_news_items_url
    assert_response :success
  end

  test 'should show news_item' do
    get admin_news_item_url(@news_item)
    assert_response :success
  end

  test 'should get edit' do
    get edit_admin_news_item_url(@news_item)
    assert_response :success
  end

  test 'should update news_item' do
    patch admin_news_item_url(@news_item), params: { news_item: {
      article_url: @news_item.article_url,
      description: @news_item.description,
      image_alt_text: @news_item.image_alt_text,
      image_url: @news_item.image_url,
      title: @news_item.title,
    } }
    assert_redirected_to admin_news_item_url(@news_item)
  end
end
