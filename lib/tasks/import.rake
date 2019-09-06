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

    if path.starts_with?(url_prefix)
      puts 'Importing from URL using curl...'
      curl = curl_for_url(path)
      puts curl
      copy_csv_to_table("PROGRAM '#{curl}'", 'widget_datapoints')
    else
      puts 'Importing from file...'
      copy_csv_to_table("'#{path}'", 'widget_datapoints')
    end

    puts "Done in #{Time.current - start_time} seconds."
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
