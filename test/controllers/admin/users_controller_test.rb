require 'test_helper'

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @user = build(:user)
  end

  test 'should get index' do
    get admin_users_url
    assert_response :success
  end

  test 'should get new' do
    get new_admin_user_url
    assert_response :success
  end

  test 'should create user' do
    assert_difference('User.count') do
      post admin_users_url, params: {
        user: {
          email: @user.email,
          password: @user.password,
          password_confirmation: @user.password_confirmation,
        },
      }
    end

    assert_redirected_to admin_users_url
  end

  test 'should destroy user' do
    @user.save!

    assert_difference('User.count', -1) do
      delete admin_user_url(@user)
    end

    assert_redirected_to admin_users_url
  end
end
