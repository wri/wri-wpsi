namespace :import do
  desc 'Import data for widgets from a csv file'
  task :widget_datapoints, %i[path] => :environment do |_task, args|
    start_time = Time.current
    path = args.path
    url_prefix = 'https://www.googleapis.com/storage/'

    unless path&.starts_with?(url_prefix) || path&.ends_with?('.csv')
      puts 'Invalid args! Exiting...'
      puts "Usage: rake 'import:widget_datapoints[path/to/csv/file.csv]'"
      exit
    end

    import_widget_datapoints(path)

    puts "Done in #{Time.current - start_time} seconds."
  end

  desc 'Import widget specs from a csv file'
  task widget_specs: :environment do
    start_time = Time.current
    load_widget_specs
    puts "Done in #{Time.current - start_time} seconds."
  end
end

def import_widget_datapoints(path)
  if path.starts_with?(url_prefix)
    puts 'Importing from URL using curl...'
    curl = curl_for_url(path)
    puts curl
    copy_csv_to_table("PROGRAM '#{curl}'", 'widget_datapoints')
  else
    puts 'Importing from file...'
    copy_csv_to_table("'#{path}'", 'widget_datapoints')
  end
end

# Meant to work with URLs in the form of:
# https://www.googleapis.com/storage/v1/b/[BUCKET_NAME]/o/[OBJECT_NAME]?alt=media
# See https://cloud.google.com/storage/docs/downloading-objects for more info
def curl_for_url(url)
  token = ENV['WRI_WPSI_GOOGLE_CLOUD_STORAGE_TOKEN']

  if token.nil?
    puts 'WRI_WPSI_GOOGLE_CLOUD_STORAGE_TOKEN not defined! Exiting...'
    # Get a fresh token from https://developers.google.com/oauthplayground/
    exit
  end

  %(curl -X GET -H "Authorization: Bearer #{token}" "#{url}")
end

def copy_csv_to_table(csv, table)
  sql = "COPY #{table} FROM #{csv} DELIMITERS ',' CSV HEADER;"
  ActiveRecord::Base.connection.execute(sql)
end

TEMPLATE = {
  spec: File.read('./test/fixtures/files/sample_widget_spec.json').freeze,
  table_id: 'locdensity'.freeze,
  x_axis_label: 'Year'.freeze,
  y_axis_label: 'Population Density (people/km²)'.freeze,
}.freeze

def load_widget_specs
  require 'csv'

  table = CSV.parse(File.read('./test/fixtures/files/widget_specs.csv'), headers: true)
  table = table.reject { |row| row['layer_id'].blank? || row['widget_type'] != 'Time series' }

  layers = []

  table.each do |row|
    puts row.inspect
    layers << load_widget_spec(row)
  end

  layers.compact.each(&:save!)
end

def load_widget_spec(row)
  spec = TEMPLATE[:spec].dup
  layer = Layer.find_by(layer_id: row['layer_id'])

  if layer.nil?
    puts "ERROR: Layer #{row['layer_id']} not found!"
  else
    merge_row_defaults!(row)
    update_spec_with_row_values!(spec, row)
    layer.widget_spec = spec
  end

  layer
end

def merge_row_defaults!(row)
  row['escaped_table_id'] = row['table_id'].gsub('.', '\\\\\\\\\\\\.')
  row['x_axis_label'] ||= TEMPLATE[:x_axis_label]
  row['y_axis_label'] ||= row['name']
end

def update_spec_with_row_values!(spec, row)
  escape_field_names!(spec, row)
  spec.gsub!(TEMPLATE[:table_id], row['table_id'])
  spec.gsub!(TEMPLATE[:x_axis_label], row['x_axis_label'])
  spec.gsub!(TEMPLATE[:y_axis_label], row['y_axis_label'])
end

def escape_field_names!(spec, row)
  spec.gsub!(%("field": "#{TEMPLATE[:table_id]}"), %("field": "#{row['escaped_table_id']}"))
  spec.gsub!(%(hover.datum['#{TEMPLATE[:table_id]}']), %(hover.datum['#{row['escaped_table_id']}']))
end
