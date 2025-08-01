class CreateInfoModals < ActiveRecord::Migration[5.2]
  def change
    create_table :info_modals do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.string :info_modal_id, null: false

      t.timestamps
    end

    add_index :info_modals, :info_modal_id, unique: true
  end
end 