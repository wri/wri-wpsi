require 'test_helper'

class WidgetDatapointsControllerTest < ActionDispatch::IntegrationTest
  include Rack::Test::Methods

  setup do
    create(:widget_datapoint)
  end

  test 'simple request' do
    get api_v1_widget_datapoints_path(gid_2: 'USA.1.1', field_name: 'gid_0')
    assert last_response.ok?

    expected_response = {
      widget_datapoints: [
        {
          gid_2: 'USA.1.1',
          month_indep: '2000-01-01',
          year: 2000,
          gid_0: 'USA',
        },
      ],
    }.to_json

    assert_equal expected_response, last_response.body
  end
end
