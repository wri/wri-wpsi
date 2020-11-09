require 'application_system_test_case'

class FileUploadsTest < ApplicationSystemTestCase
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
  end

  test 'visiting the index' do
    visit admin_file_uploads_url
    assert_selector 'h2', text: 'Listing file uploads'
  end
end
