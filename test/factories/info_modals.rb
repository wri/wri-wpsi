FactoryBot.define do
  factory :info_modal do
    sequence(:title) { |n| "Info Modal #{n}" }
    sequence(:content) { |n| "This is the content for info modal #{n}. It contains some sample text for testing purposes." }
    sequence(:info_modal_id) { |n| "info-modal-#{n}" }
  end
end
