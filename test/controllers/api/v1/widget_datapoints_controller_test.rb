require 'test_helper'

class WidgetDatapointsControllerTest < ActionDispatch::IntegrationTest
  include Rack::Test::Methods

  setup do
    create(:widget_datapoint, rainfed: 1.0)
  end

  test 'simple request' do
    get api_v1_widget_datapoints_path(gid_1: 'USA.1', field_name: 'rainfed')
    assert last_response.ok?

    expected_response = {
      widget_datapoints: [
        {
          gid_1: 'USA.1',
          month_date: '2000-01-01',
          year: 2000,
          rainfed: '1.0',
        },
      ],
    }.to_json

    assert_equal expected_response, last_response.body
  end

  test 'simple csv request' do
    get api_v1_widget_datapoints_csv_path(gid_1: 'USA.1', field_name: 'rainfed')
    assert last_response.ok?

    expected_response = "gid_1,month_date,rainfed\nUSA.1,2000-01-01,1.0\n"
    assert_equal expected_response, last_response.body
  end
end
