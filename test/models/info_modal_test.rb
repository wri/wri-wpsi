require 'test_helper'

class InfoModalTest < ActiveSupport::TestCase
  def setup
    @info_modal = InfoModal.new(
      title: 'Test Modal',
      content: 'This is test content for the modal.',
      info_modal_id: 'test-modal-1'
    )
  end

  test 'should be valid' do
    assert @info_modal.valid?
  end

  test 'title should be present' do
    @info_modal.title = '   '
    assert_not @info_modal.valid?
  end

  test 'content should be present' do
    @info_modal.content = '   '
    assert_not @info_modal.valid?
  end

  test 'info_modal_id should be present' do
    @info_modal.info_modal_id = '   '
    assert_not @info_modal.valid?
  end

  test 'info_modal_id should be unique' do
    @info_modal.save
    duplicate_modal = InfoModal.new(
      title: 'Another Modal',
      content: 'Another test content.',
      info_modal_id: 'test-modal-1'
    )
    assert_not duplicate_modal.valid?
  end

  test 'to_param should return info_modal_id' do
    @info_modal.save
    assert_equal @info_modal.info_modal_id, @info_modal.to_param
  end
end
