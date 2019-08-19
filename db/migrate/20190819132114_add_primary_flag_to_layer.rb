class AddPrimaryFlagToLayer < ActiveRecord::Migration[5.2]
  def change
    add_column :layers, :primary, :boolean
  end
end
