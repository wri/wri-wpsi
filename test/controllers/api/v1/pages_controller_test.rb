require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  include Rack::Test::Methods

  setup do
    create(:page)
  end

  test 'simple request' do
    get api_v1_pages_path
    assert last_response.ok?
    expected_response = { pages: Page.serialized_for_react_app }.to_json
    assert_equal expected_response, last_response.body
  end
end
