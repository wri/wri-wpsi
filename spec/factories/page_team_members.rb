FactoryBot.define do
  factory :page_team_member do
    page { create(:page) }
    team_member { create(:team_member) }
  end
end
