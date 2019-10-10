class AddSortPriorityToPages < ActiveRecord::Migration[5.2]
  def change
    add_column :pages, :sort_priority, :decimal
  end
end
