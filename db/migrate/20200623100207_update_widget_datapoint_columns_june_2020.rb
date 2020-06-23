class UpdateWidgetDatapointColumnsJune2020 < ActiveRecord::Migration[5.2]
  def change
    remove_column :widget_datapoints, :spi_3, :decimal
    add_column :widget_datapoints, :spi_3, :string
    remove_column :widget_datapoints, :spi_6, :decimal
    add_column :widget_datapoints, :spi_6, :string
    remove_column :widget_datapoints, :spi_12, :decimal
    add_column :widget_datapoints, :spi_12, :string
    remove_column :widget_datapoints, :spi_24, :decimal
    add_column :widget_datapoints, :spi_24, :string

    add_column :widget_datapoints, :country, :string
    add_column :widget_datapoints, :government, :string
    add_column :widget_datapoints, :IncomeGroup, :string
    add_column :widget_datapoints, :Region, :string
    add_column :widget_datapoints, :TableName, :string
  end
end
