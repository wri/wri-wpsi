require 'test_helper'

class Admin::LayersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'should redirect when the user hits the new url' do
    get new_user_registration_url
    assert_response :redirect
  end

  test 'should redirect when the user hits the create url' do
    post user_registration_url
    assert_response :redirect
  end
end
