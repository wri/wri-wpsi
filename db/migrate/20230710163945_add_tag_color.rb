class AddTagColor < ActiveRecord::Migration[5.2]
  def change
    add_column :tags, :tag_color, :string, :default => '#ffffff'
  end
end
