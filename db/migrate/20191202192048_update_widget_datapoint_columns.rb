class UpdateWidgetDatapointColumns < ActiveRecord::Migration[5.2]
  def up
    change_column :widget_datapoints, :reign, :string

    add_column :widget_datapoints, :acled_fatalities, :decimal
    add_column :widget_datapoints, :prediction, :decimal
    add_column :widget_datapoints, :prediction_prob, :decimal
  end

  def down
    remove_column :widget_datapoints, :acled_fatalities, :decimal
    remove_column :widget_datapoints, :prediction, :decimal
    remove_column :widget_datapoints, :prediction_prob, :decimal

    # This fails when trying to convert strings to decimals,
    # so just leave it as a string when reverting.
    # change_column :widget_datapoints, :reign, :decimal, using: 'reign::decimal'
  end
end
