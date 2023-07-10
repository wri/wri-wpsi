class TeamMember < ApplicationRecord
  validates :name, presence: true
  validates :position, presence: true
  validates :email, presence: true
  validates :profile_image, presence: true

  has_and_belongs_to_many :tags, join_table: :team_member_tags

  scope :ordered_by_name, -> { order(priority: :desc, name: :asc) }
  scope :ordered_by_name_and_country, -> { order(country_priority: :desc, priority: :desc, name: :asc) }
end
