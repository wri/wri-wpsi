class CreateTeamMemberTags < ActiveRecord::Migration[5.2]
  def change
    create_table :team_member_tags do |t|
      t.references :team_member, foreign_key: true
      t.references :tag, foreign_key: true

      t.timestamps
    end
  end
end
