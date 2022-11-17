require 'csv'

class WidgetDatapoint < ApplicationRecord
  alias_attribute :gid_0, :GID_0
  alias_attribute :gid_1, :GID_1

  def self.serialized_for_react_app(field_name)
    all.map do |widget_datapoint|
      {
        gid_1: widget_datapoint.gid_1,
        month_date: widget_datapoint.month_date,
        year: widget_datapoint.month_date.year,
        field_name.to_sym => widget_datapoint.send(field_name),
      }
    end
  end

  def self.csv_headers(field_name)
    csv_attributes(field_name)
  end

  def self.csv_attributes(field_name)
    if field_name
      %w[gid_1 month_date] << field_name
    else
      attribute_names
    end
  end

  def self.to_csv(field_name)
    CSV.generate(headers: true) do |csv|
      csv << csv_headers(field_name)

      all.each do |widget_datapoint| # rubocop:disable Rails/FindEach
        csv << csv_attributes(field_name).map { |attr| widget_datapoint.send(attr) }
      end
    end
  end
end
