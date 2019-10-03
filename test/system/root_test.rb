require 'application_system_test_case'

class RootTest < ApplicationSystemTestCase
  def test_health_check
    visit '/health-check'
    assert_text 'OK'
  end

  def test_root_redirect
    attempts = 0

    begin
      visit '/'
      assert current_path == '/map'
    rescue Net::ReadTimeout => e
      raise e if (attempts += 1) > 3

      puts "Timeout (#{e}), retrying in 1 second..."
      sleep(1)
      retry
    end
  end

  def test_landing_page
    visit '/map'

    assert_selector '#top-banner', text: 'Water, Peace & Security'
  end
end
