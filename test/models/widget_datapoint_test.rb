require 'test_helper'

class WidgetDatapointTest < ActiveSupport::TestCase
  setup do
    @datapoint = create(:widget_datapoint)
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

  test 'self.to_csv' do
    expected = "gid_2,month_indep,rainfed\nUSA.1.1,2000-01-01,0.12345\n"
    assert_equal expected, WidgetDatapoint.to_csv('rainfed')
  end

  test 'self.to_csv with no field name' do
    attributes = WidgetDatapoint.attribute_names
    header_row = attributes.join(',')
    values_row = attributes.map { |attr| @datapoint.send(attr.to_sym) }.join(',')

    expected = "#{header_row}\n#{values_row}\n"
    assert_equal expected, WidgetDatapoint.to_csv(nil)
  end
end
