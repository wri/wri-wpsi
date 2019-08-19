class RenameLayerCategoryField < ActiveRecord::Migration[5.2]
  def change
    rename_column :layers, :category, :category_slug
  end
end
