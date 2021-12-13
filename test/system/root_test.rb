require 'application_system_test_case'

class RootTest < ApplicationSystemTestCase
  def test_health_check
    visit '/health-check'
    assert_text 'OK'
  end

  def test_landing_page
    retry_on_timeout do
      visit '/'
      assert_selector 'a > img[alt="WPS logo"]'
      assert_selector '#hero'
      create(:news_item, title: 'News Item 1')
      create(:news_item, title: 'News Item 2')
      NewsItem.current.each_with_index do |item, i|
        i < 4 ? assert_text(item.title) : assert_no_text(item.title)
      end
    end
  end

  def test_news_page
    visit '/news'
    assert_selector 'a > img[alt="WPS logo"]'
    NewsItem.current.each { |item| assert_text item.title }
    find_link('View Archive').click
    assert page.current_path == '/archive'
  end

  def test_news_page_limit
    30.times { |n| create(:news_item, title: "News Item #{n}", published: true) }
    visit '/news'
    NewsItem.current.each_with_index do |item, i|
      if i >= 20
        assert_no_text item.title
      else
        assert_text item.title
      end
    end
  end

  def test_empty_news_page
    NewsItem.destroy_all
    visit '/news'
    assert_selector 'a > img[alt="WPS logo"]'
    assert_text 'No news items'
    assert_no_text 'View Archive'
  end

  def test_archive_page # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    visit '/archive'
    assert_selector 'a > img[alt="WPS logo"]'
    NewsItem.category_labels.each do |category, label|
      if NewsItem.archived.with_category(category).empty?
        assert_not page.has_selector? "##{category}"
        next
      end

      find("##{category}").assert_text(label)
      NewsItem.archived.each do |item|
        if item.categories.include?(category)
          find("##{category}").assert_text(item.title)
        else
          find("##{category}").assert_no_text(item.title)
        end
      end
    end
  end

  def test_empty_archive_page
    NewsItem.destroy_all
    visit '/archive'
    assert_selector 'a > img[alt="WPS logo"]'
    assert_text 'No archived items'
  end

  def test_map_page
    retry_on_timeout do
      visit '/map'
      assert_selector 'a > img[alt="WPS logo"]'
      assert_selector '.leaflet-container'
      assert_text 'INVESTIGATION'
    end
  end

  def retry_on_timeout
    attempts = 0

    begin
      yield
    rescue Net::ReadTimeout => e
      raise e if (attempts += 1) > 3

      puts "Timeout (#{e}), retrying in 1 second..."
      sleep(1)
      retry
    end
  end
end
