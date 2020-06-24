class RemoveUnsusedFieldsFromWidgetDatapoints < ActiveRecord::Migration[5.2]
  def change
    remove_column :widget_datapoints, :country, :string
    remove_column :widget_datapoints, :IncomeGroup, :string
    remove_column :widget_datapoints, :Region, :string
    remove_column :widget_datapoints, :TableName, :string
    remove_column :widget_datapoints, :spi_3, :string
    remove_column :widget_datapoints, :spi_6, :string
  end
end
