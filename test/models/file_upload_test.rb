require 'test_helper'

class FileUploadTest < ActiveSupport::TestCase
  test 'create' do
    FileUpload.create!(description: 'test upload')
    assert_equal 1, FileUpload.count
    assert_equal 'test upload', FileUpload.first.description
  end
end
