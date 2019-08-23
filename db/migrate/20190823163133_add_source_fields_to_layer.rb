class AddSourceFieldsToLayer < ActiveRecord::Migration[5.2]
  def change
    add_column :layers, :source_name, :string
    add_column :layers, :source_url, :string
    add_column :layers, :source_description, :string
  end
end
