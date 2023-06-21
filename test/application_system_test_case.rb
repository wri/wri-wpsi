require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  include Warden::Test::Helpers
  self.use_transactional_tests = true

  # Run tests on host, optionally with live browser debugging.

  # Use live browser debugging if SYSTEM_TEST_STRATEGY=host_debug or if CHROME_DEBUG is set.
  # Otherwise, use headless browser.
  browser = (ENV.fetch('CHROME_DEBUG', false)) ? :chrome : :headless_chrome

  driven_by :selenium, using: browser, screen_size: [1366, 768]
  

  # `id` must be the id attribute of the editor instance e.g.
  # <textarea id="foo" ...></textarea>
  def tinymce_fill_in(id, with:)
    find("##{id}_ifr").send_keys(with)
  end
end
