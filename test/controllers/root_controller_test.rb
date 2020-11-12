require 'test_helper'

class RootControllerTest < ActionDispatch::IntegrationTest
  test 'should get landing page' do
    get root_path
    assert_response :success
  end

  test 'should get map page' do
    get page_path(pages(:map))
    assert_redirected_to map_path

    get map_path
    assert_response :success
  end

  test 'should get CMS pages' do
    get page_path(create(:page))
    assert_response :success
  end

  test 'should redirect contentless pages' do
    get page_path(pages(:global_tool))
    assert_redirected_to map_path
  end

  test 'should redirect non-existant pages' do
    get '/info/non-existant'
    assert_redirected_to map_path
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
