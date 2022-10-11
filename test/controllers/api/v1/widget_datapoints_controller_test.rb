require 'test_helper'

class WidgetDatapointsControllerTest < ActionDispatch::IntegrationTest
  include Rack::Test::Methods

  setup do
    create(:widget_datapoint, buffalo_number: 1)
  end

  test 'simple request' do
    get api_v1_widget_datapoints_path(gid_2: 'USA.1.1', field_name: 'buffalo_number')
    assert last_response.ok?

    expected_response = {
      widget_datapoints: [
        {
          gid_2: 'USA.1.1',
          month_date: '2000-01-01',
          year: 2000,
          buffalo_number: '1',
        },
      ],
    }.to_json

    assert_equal expected_response, last_response.body
  end

  test 'simple csv request' do
    get api_v1_widget_datapoints_csv_path(gid_2: 'USA.1.1', field_name: 'buffalo_number')
    assert last_response.ok?

    expected_response = "gid_2,month_date,buffalo_number\nUSA.1.1,2000-01-01,1\n"
    assert_equal expected_response, last_response.body
  end
end
