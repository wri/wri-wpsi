class AddCategoriesAndPublishedToNewsItems < ActiveRecord::Migration[5.2]
  def change
    add_column :news_items, :published, :boolean, default: false
    add_column :news_items, :categories, :string, array: true, default: []
  end
end
