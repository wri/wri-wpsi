require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'create' do
    count = User.count
    User.create!(email: 'test@example.com', password: 'test_password')
    assert_equal 1, count + 1
  end
end
