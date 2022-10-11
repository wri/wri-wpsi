require 'test_helper'
require 'e2e_tests'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  include Warden::Test::Helpers
  self.use_transactional_tests = true

  SYSTEM_TEST_STRATEGY = ENV.fetch('SYSTEM_TEST_STRATEGY', 'host')
  case SYSTEM_TEST_STRATEGY
  when 'container_headless_chrome'
    include E2eTests::Helpers
    driven_by :cuprite
    if Rails.version =~ /\A(6\.0|5\.2)/
      setup do
        host! E2eTests::CAPYBARA_APP_HOST
      end
    end
  when 'host', 'host_debug'
    # Run tests on host, optionally with live browser debugging.

    # Use live browser debugging if SYSTEM_TEST_STRATEGY=host_debug or if CHROME_DEBUG is set.
    # Otherwise, use headless browser.
    browser = (SYSTEM_TEST_STRATEGY == 'host_debug' || ENV.fetch('CHROME_DEBUG', false)) ? :chrome : :headless_chrome

    driven_by :selenium, using: browser, screen_size: [1366, 768]
  else
    raise %(Invalid SYSTEM_TEST_STRATEGY "#{SYSTEM_TEST_STRATEGY}")
  end

  # `id` must be the id attribute of the editor instance e.g.
  # <textarea id="foo" ...></textarea>
  def tinymce_fill_in(id, with:)
    find("##{id}_ifr").send_keys(with)
  end
end

E2eTests::Setup.perform if ApplicationSystemTestCase::SYSTEM_TEST_STRATEGY != 'host'
