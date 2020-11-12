class CreateNewsItems < ActiveRecord::Migration[5.2]
  def change
    create_table :news_items do |t|
      t.string :title
      t.text :description
      t.text :article_url
      t.string :image_url
      t.text :image_alt_text

      t.timestamps
    end
  end
end
