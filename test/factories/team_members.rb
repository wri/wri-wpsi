FactoryBot.define do
  factory :team_member do
    name { Faker::Name.name }
    description { Faker::Lorem.sentence }
    email { Faker::Internet.email }
    profile_image { Rack::Test::UploadedFile.new('test/fixtures/files/gr_logo.png', 'image/png') }
    tags { Tag.all.limit(3) }

    trait :with_new_tags do
      tags {  FactoryBot.build_list :tag, 3 }
    end
  end
end
