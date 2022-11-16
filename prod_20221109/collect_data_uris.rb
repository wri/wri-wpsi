require 'csv'
filename = 'prod_20221109/layers_gid-1.json'
path = Rails.root.join(filename)
data = File.read(path)
data_uris = []

matches = {}
published = {}
JSON.parse(data).each do |values|
  found = values['widget_spec'].to_s.scan(%r{api/v1[^"]*})
  if found.any?
    key = values['name'].strip
    matches[key] ||= []
    matches[key] += found.map { |s| s.gsub(/.*region\.gid_2\}\//, '').gsub('/', '') }
    published[key] = values['published']
  end
end

result = CSV.generate(headers: true) do |csv|
  csv <<  ['Layer Name', 'Variable', 'Published']
  matches.keys.sort.each do |key|
    values = matches[key]
    values.sort.uniq.each do |value|
      csv << [key, value, published[key]]
    end
  end
end
puts result
