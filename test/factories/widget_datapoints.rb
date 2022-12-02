FactoryBot.define do
  factory :widget_datapoint do
    gid_0 { 'USA' }
    gid_1 { 'USA.1' }
    month_date { Date.parse('2000-01-01') }
    rainfed { '0.12345' }
  end
end
