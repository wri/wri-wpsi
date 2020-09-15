require 'test_helper'

class Admin::StyleGuidesControllerTest < ActionDispatch::IntegrationTest
  test 'should get article' do
    get admin_style_guides_article_url
    assert_response :success
  end
end
