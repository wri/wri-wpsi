class TeamMember < ApplicationRecord
  has_and_belongs_to_many :tags, join_table: :team_member_tags
end
