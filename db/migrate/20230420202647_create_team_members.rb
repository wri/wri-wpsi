class CreateTeamMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :team_members do |t|
      t.string :name
      t.string :description
      t.string :email

      t.timestamps
    end
  end
end
