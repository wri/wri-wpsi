require 'test_helper'

class Admin::InfoModalsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    sign_in create(:user)
    @info_modal = info_modals(:one)
  end

  test 'should get index' do
    get admin_info_modals_url
    assert_response :success
  end

  test 'should get new' do
    get new_admin_info_modal_url
    assert_response :success
  end

  test 'should create info_modal' do
    assert_difference('InfoModal.count') do
      post admin_info_modals_url, params: {
        info_modal: {
          title: 'New Modal',
          content: 'New modal content',
          info_modal_id: 'new-modal-1'
        }
      }
    end

    assert_redirected_to admin_info_modal_url(InfoModal.last)
  end

  test 'should show info_modal' do
    get admin_info_modal_url(@info_modal)
    assert_response :success
  end

  test 'should get edit' do
    get edit_admin_info_modal_url(@info_modal)
    assert_response :success
  end

  test 'should update info_modal' do
    patch admin_info_modal_url(@info_modal), params: {
      info_modal: {
        title: 'Updated Modal',
        content: 'Updated modal content',
        info_modal_id: 'updated-modal-1'
      }
    }
    assert_redirected_to admin_info_modal_url('updated-modal-1')
  end

  test 'should destroy info_modal' do
    assert_difference('InfoModal.count', -1) do
      delete admin_info_modal_url(@info_modal)
    end

    assert_redirected_to admin_info_modals_url
  end
end 