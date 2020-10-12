require 'test_helper'

class Admin::StyleGuidesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @page = create(:page)
  end

  test 'should get article' do
    get admin_style_guides_article_url
    assert_response :success
  end
end
