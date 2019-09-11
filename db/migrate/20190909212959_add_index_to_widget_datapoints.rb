class AddIndexToWidgetDatapoints < ActiveRecord::Migration[5.2]
  def change
    # Ensure max one datapoint per month per gid_2 region
    add_index :widget_datapoints, [:gid_2, :month_indep], unique: true
  end
end
