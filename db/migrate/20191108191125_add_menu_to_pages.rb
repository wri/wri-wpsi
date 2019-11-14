class AddMenuToPages < ActiveRecord::Migration[5.2]
  def up
    add_column :pages, :menu, :string
    Page.update_all('menu = name')
  end

  def down
    remove_column :pages, :menu
  end
end
