require 'test_helper'

class WidgetDatapointTest < ActiveSupport::TestCase
  setup do
    create(:widget_datapoint)
  end

  test 'self.serialized_for_react_app' do
    expected = [
      {
        gid_2: 'USA.1.1',
        month_indep: Date.new(2000, 1, 1),
        year: 2000,
        rainfed: 0.12345,
      },
    ]

    assert_equal expected, WidgetDatapoint.serialized_for_react_app('rainfed')
  end
end
