require 'test_helper'

class RootControllerTest < ActionDispatch::IntegrationTest
  test 'should redirect to single page app' do
    get root_path
    assert_response :redirect
  end

  test 'should get single page app' do
    get map_path
    assert_response :success
  end

  test 'health check' do
    get '/health-check'
    assert_response :success
    assert 'OK', response.body
  end

  test 'notifier check' do
    assert_raises RuntimeError do
      get '/notifier-check'
    end
  end

  test 'timeout check' do
    # No point in testing an infinite loop
  end
end
