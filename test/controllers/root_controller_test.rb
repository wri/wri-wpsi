require 'test_helper'

class RootControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get root_path
    assert_response :success
  end

  test "health check" do
    get '/health-check'
    assert_response :success
    assert 'OK', response.body
  end

  test "notifier check" do
    assert_raises RuntimeError do
      get '/notifier-check'
    end
  end
end
