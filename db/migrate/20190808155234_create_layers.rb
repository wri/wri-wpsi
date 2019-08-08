class CreateLayers < ActiveRecord::Migration[5.2]
  def change
    create_table :layers do |t|
      t.string :name
      t.text :description
      t.string :layer_id
      t.string :dataset_id
      t.boolean :published
      t.string :category

      t.timestamps
    end
    add_index :layers, :layer_id, unique: true
  end
end
