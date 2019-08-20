require 'application_system_test_case'

class RootTest < ApplicationSystemTestCase
  def test_health_check
    visit '/health-check'
    assert_text 'OK'
  end

  def test_root_redirect
    visit '/'
    assert current_path == '/map'
  end

  def test_landing_page
    visit '/map'

    assert_selector '#top-banner', text: 'Water, Peace & Security'
  end
end
