FactoryBot.define do
  factory :widget_datapoint do
    gid_0 { 'USA' }
    gid_1 { 'USA.1' }
    gid_2 { 'USA.1.1' }
    month_indep { Date.parse('2000-01-01') }
    rainfed { '0.12345' }
  end
end
