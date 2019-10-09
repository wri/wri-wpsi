FactoryBot.define do
  factory :page do
    sequence :name do |n|
      "Page #{n}"
    end

    sequence :slug do |n|
      "page-#{n}"
    end

    content { 'Sample page content with <i>formatting</i>' }
  end
end
