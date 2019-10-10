require 'test_helper'

class LayersControllerTest < ActionDispatch::IntegrationTest
  include Rack::Test::Methods

  test 'simple request' do
    get api_v1_layers_path
    assert last_response.ok?
    expected_response = { layers: Layer.serialized_for_react_app }.to_json
    assert_equal expected_response, last_response.body
  end
end
