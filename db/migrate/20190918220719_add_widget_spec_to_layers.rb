class AddWidgetSpecToLayers < ActiveRecord::Migration[5.2]
  def change
    add_column :layers, :widget_spec, :text
  end
end
