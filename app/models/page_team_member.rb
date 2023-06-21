class PageTeamMember < ApplicationRecord
  belongs_to :page
  belongs_to :team_member
end
