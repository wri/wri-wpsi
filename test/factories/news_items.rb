FactoryBot.define do
  factory :news_item do
    title { 'MyString' }
    description { 'MyText' }
    article_url { Faker::Internet.url }
    # image url must be real, system tests will fetch it
    image_url { 'https://via.placeholder.com/150' }
    image_alt_text { 'MyText' }
    date { Date.new(2020, 9, 1) }
  end
end
