require 'test_helper'

class Admin::FileUploadsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @file_upload = build(:file_upload)
  end

  test 'getting index' do
    get admin_file_uploads_url
    assert_response :success
  end

  test 'getting new' do
    get new_admin_file_upload_url
    assert_response :success
  end

  test 'creating file upload' do
    file = fixture_file_upload('files/gr_logo.png', 'image/png')

    assert_difference('FileUpload.count') do
      post admin_file_uploads_url, params: {
        file_upload: {
          description: @file_upload.description,
          file: file,
        },
      }
    end

    assert(
      FileUpload.last.file.attached?,
      'Expected file upload to have an attached file.',
    )

    assert_redirected_to admin_file_uploads_url
  end

  test 'destroying file upload' do
    @file_upload.save!

    assert_difference('FileUpload.count', -1) do
      delete admin_file_upload_url(@file_upload)
    end

    assert_redirected_to admin_file_uploads_url
  end
end
