class TeamMemberTag < ApplicationRecord
  belongs_to :team_member
  belongs_to :tag
end
