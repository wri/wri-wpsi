FactoryBot.define do
  factory :news_item do
    title { 'MyString' }
    description { 'MyText' }
    article_url { 'MyText' }
    image_url { 'MyString' }
    image_alt_text { 'MyText' }
  end
end
