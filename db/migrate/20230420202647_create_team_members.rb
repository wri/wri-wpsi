class CreateTeamMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :team_members do |t|
      t.string :name
      t.string :position
      t.string :email
      t.string :profile_image

      t.timestamps
    end
  end
end
