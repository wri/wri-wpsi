class ChangeNewsItemDateColumnDataType < ActiveRecord::Migration[5.2]
  def change
    change_column :news_items, :date, 'date USING date::date'
  end
end
