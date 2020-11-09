require 'test_helper'

class FileUploadTest < ActiveSupport::TestCase
  test 'create' do
    FileUpload.create!
    assert_equal 1, FileUpload.count
  end
end
