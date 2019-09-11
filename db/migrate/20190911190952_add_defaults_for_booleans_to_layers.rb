class AddDefaultsForBooleansToLayers < ActiveRecord::Migration[5.2]
  def change
    change_column_null :layers, :published, false, false
    change_column_null :layers, :primary, false, false
    change_column_default :layers, :published, from: nil, to: false
    change_column_default :layers, :primary, from: nil, to: false
  end
end
