require 'test_helper'

class Api::V1::InfoModalsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get api_v1_info_modals_url, as: :json
    assert_response :success
  end

  test 'should return all info modals as json' do
    get api_v1_info_modals_url, as: :json
    assert_response :success

    response_data = JSON.parse(response.body)
    assert_equal 2, response_data.length
  end
end
