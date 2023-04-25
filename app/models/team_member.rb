class TeamMember < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :email, presence: true
  validates :profile_image, presence: true

  has_and_belongs_to_many :tags, join_table: :team_member_tags
end
