require 'test_helper'

class ApplicationMailerTest < ActionMailer::TestCase
  test 'that it has a default from email' do
    assert_equal 'from@example.com', ApplicationMailer.default[:from]
  end
end
