class AddDateToNewsItems < ActiveRecord::Migration[5.2]
  def change
    add_column :news_items, :date, :string
  end
end
