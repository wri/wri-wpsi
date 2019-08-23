class AddLongDescriptionToLayers < ActiveRecord::Migration[5.2]
  def change
    add_column :layers, :long_description, :text
    rename_column :layers, :description, :short_description
  end
end
