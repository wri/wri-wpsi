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

  test 'should get new' do
    get new_admin_news_item_url(@news_item)
    assert_response :success
  end

  test 'should create news_item' do
    assert_difference('NewsItem.count', 1) do
      post admin_news_items_url, params: {
        news_item: {
          date: @news_item.date,
          article_url: @news_item.article_url,
          description: @news_item.description,
          image_alt_text: @news_item.image_alt_text,
          image_url: @news_item.image_url,
          title: @news_item.title,
          published: @news_item.published,
          categories: @news_item.categories,
          slug: 'some_unique_slug',
        },
      }
    end

    assert_redirected_to admin_news_item_url(NewsItem.last)
  end

  test 'should not create invalid news item' do
    assert_no_difference('NewsItem.count') do
      post admin_news_items_url, params: {
        news_item: {
          description: @news_item.description,
          slug: 'some_unique_slug',
        },
      }
    end

    assert_response :success
  end

  test 'should update news_item' do
    patch admin_news_item_url(@news_item), params: { news_item: {
      date: @news_item.date,
      article_url: @news_item.article_url,
      description: @news_item.description,
      image_alt_text: @news_item.image_alt_text,
      image_url: @news_item.image_url,
      title: @news_item.title,
      published: @news_item.published,
      categories: @news_item.categories,
    } }
    assert_redirected_to admin_news_item_url(@news_item)
  end

  test 'should not update invalid news_item' do
    patch admin_news_item_url(@news_item), params: { news_item: {
      article_url: @news_item.article_url,
      description: @news_item.description,
      image_alt_text: @news_item.image_alt_text,
      image_url: @news_item.image_url,
      title: nil,
    } }
    assert_response :success
  end

  test 'should destroy news_item' do
    assert_difference('NewsItem.count', -1) do
      delete admin_news_item_url(@news_item)
    end

    assert_redirected_to admin_news_items_url
  end
end
