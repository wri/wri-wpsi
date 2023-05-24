FactoryBot.define do
  factory :event do
    title { "Test Event" }
    start { Time.now + 1.hours }
    ends { start  +  2.hours }
    location { "Remote" }
  end
end
