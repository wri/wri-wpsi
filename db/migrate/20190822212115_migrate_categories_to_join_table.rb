class MigrateCategoriesToJoinTable < ActiveRecord::Migration[5.2]
  def up
    Layer.all.each do |layer|
      layer.categories = [Category.find_by_slug(layer.category_slug)]
      layer.save(validate: false)
    end

    remove_column :layers, :category_slug, :string
  end

  def down
    add_column :layers, :category_slug, :string

    Layer.all.each do |layer|
      layer.category_slug = layer.categories.first.slug
      layer.save(validate: false)
    end
  end
end
