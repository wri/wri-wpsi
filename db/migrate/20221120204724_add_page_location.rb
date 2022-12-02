class AddPageLocation < ActiveRecord::Migration[5.2]
  def change
    add_column :pages, :location, :string
  end
end
