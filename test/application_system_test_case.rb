require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  if ENV['DEBUG_CHROME']
    # Run in a new instance of chrome for visual debugging
    Capybara.register_driver(:debug_chrome) do |app|
      capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
        chromeOptions: { args: %w[auto-open-devtools-for-tabs] },
      )

      Capybara::Selenium::Driver.new(
        app,
        browser: :chrome,
        desired_capabilities: capabilities,
      )
    end

    driven_by :debug_chrome
  else
    # Run headless by default
    driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400]
  end

  def setup
    super
    Capybara.enable_aria_label = true
  end
end
