class AddWidgetDatapointGid2Idx < ActiveRecord::Migration[5.2]
  def change
    add_index :widget_datapoints, ["GID_1", "month_date"],
      name: "widget_datapoints_idx_GID_1_date",
      unique: true
  end
end
