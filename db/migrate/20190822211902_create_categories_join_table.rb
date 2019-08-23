class CreateCategoriesJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :categories, :layers do |t|
      t.index [:category_id, :layer_id], unique: true

      t.timestamps
    end
  end
end
