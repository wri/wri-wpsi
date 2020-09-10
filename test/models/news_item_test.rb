require 'test_helper'

class NewsItemTest < ActiveSupport::TestCase
  test 'fixtures are valid' do
    NewsItem.all.each do |news_item|
      news_item.valid?
      assert_empty(news_item.errors)
    end
  end

  test 'factory is valid' do
    news_item = build(:news_item)
    news_item.valid?
    assert_empty(news_item.errors)
  end
end
