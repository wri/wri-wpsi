class WidgetDatapoint < ApplicationRecord
  def self.serialized_for_react_app(field_name)
    all.map do |widget_datapoint|
      {
        gid_2: widget_datapoint.gid_2,
        month_indep: widget_datapoint.month_indep,
        field_name => widget_datapoint.send(field_name),
      }
    end
  end
end
