class CreatePageTeamMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :page_team_members do |t|
      t.references :page, foreign_key: true
      t.references :team_member, foreign_key: true

      t.timestamps
    end
  end
end
