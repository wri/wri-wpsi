namespace 'e2e' do
  task :local do
    puts "Running E2E tests with VcXserv"
    file = ARGV[1]
    chrome_url = ENV['CHROME_URL'] || 'http://localhost:0.0'
    if file
      puts "Running file: #{file}"
      sh("RAILS_ENV=test DB_HOST=localhost DB_PORT=5432 DB_PASS=postgres DB_USER=postgres DISABLE_SPRING=true CHROME_URL=#{chrome_url} CHROME_DEBUG=true bundle exec rails test #{file}")
    else
      sh("RAILS_ENV=test DB_HOST=localhost DB_PORT=5432 DB_PASS=postgres DB_USER=postgres DISABLE_SPRING=true CHROME_URL=#{chrome_url} CHROME_DEBUG=true bundle exec rails test:system")
    end
    
  end
end