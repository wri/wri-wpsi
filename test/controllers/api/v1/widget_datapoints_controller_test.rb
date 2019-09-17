require 'test_helper'

class WidgetDatapointsControllerControllerTest < ActionDispatch::IntegrationTest
  test 'index' do
    get api_v1_widget_datapoints_path(gid_2: 'fake_gid_2', field_name: 'gid_0')
    assert_response :success
  end
end
