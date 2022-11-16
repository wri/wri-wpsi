require 'csv'

namespace :import do
  desc 'Import data for widgets from a csv file'
  task :widget_datapoints, %i[path] => :environment do |_task, args|
    start_time = Time.current
    path = args.path

    unless path&.starts_with?("https://") || path&.ends_with?('.csv')
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

  if path.starts_with?('https://')
    puts 'Importing from url...'
    csv_path = "/tmp/import-#{SecureRandom.uuid}.csv"
    %x{wget -O #{csv_path} "#{path}"}
    copy_csv_to_table(csv_path, 'widget_datapoints')
    File.delete(csv_path)
  else
    puts 'Importing from file...'
    copy_csv_to_table(path, 'widget_datapoints')
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
  ActiveRecord::Base.connection.execute('DELETE FROM widget_datapoints')

  batch_size = 10000
  batch_number = 1
  total_rows = %x{wc -l #{csv}}.split.first.to_i
  total_batches = total_rows / batch_size
  puts "input file has #{total_rows} rows"
  File.open(csv) do |file|
    headers = file.first
    file.lazy.each_slice(batch_size) do |lines|
      puts "Processing batch: #{batch_number}/#{total_batches}"
      csv_rows = CSV.parse(lines.join, headers: headers)
      widget_datapoints = csv_rows.map { |row| row.to_h }
      WidgetDatapoint.import(widget_datapoints, batch_size: batch_size)
      batch_number += 1
    end
  end
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
