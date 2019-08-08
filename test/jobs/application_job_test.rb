require 'test_helper'

class ApplicationJobTest < ActiveJob::TestCase
  test 'that it exists' do
    assert_not_nil ApplicationJob
  end
end
