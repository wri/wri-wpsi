require 'application_system_test_case'

class RootTest < ApplicationSystemTestCase
  def test_health_check
    visit '/health-check'
    assert_text 'OK'
  end

  def test_landing_page
    visit '/'
    assert_selector 'h1', text: 'Water, Peace & Security'
  end
end
