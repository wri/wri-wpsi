require 'test_helper'

class WidgetDatapointTest < ActiveSupport::TestCase
  setup do
  end

  test 'self.serialized_for_react_app' do
    expected = []

    assert_equal expected, WidgetDatapoint.serialized_for_react_app('fake_field_name')
  end
end
