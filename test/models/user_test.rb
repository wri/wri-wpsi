require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'create' do
    User.create!(email: 'test@example.com', password: 'test_password')
    assert_equal 1, User.count
  end
end
