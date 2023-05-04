def set_envs
  ENV['RAILS_ENV'] = 'test'
  ENV['DB_HOST'] = 'localhost'
  ENV['DB_PORT'] = '5432'
  ENV['DB_PASS'] = 'postgres'
  ENV['DB_USER'] = 'postgres'
  ENV['DISABLE_SPRING'] = 'true'
end

namespace 'e2e' do
  task :local do
    puts "Running E2E tests with VcXserv"
    file = ARGV[1]
    set_envs
    if file
      puts "Running file: #{file}"
      sh("bundle exec rails test #{file}")
    else
      sh("bundle exec rails test:system")
    end
  end

  task :docker do
    puts "Running E2E tests with Docker on http://localhost:3333"
    file = ARGV[1]
    set_envs
    if file
      puts "Running file: #{file}"
      sh("SYSTEM_TEST_STRATEGY=container_headless_chrome CHROME_URL=http://localhost:3333 bundle exec rails test #{file}")
    else
      sh("SYSTEM_TEST_STRATEGY=container_headless_chrome CHROME_URL=http://localhost:3333 bundle exec rails test:system")
    end
  end

  namespace :debug do
    task :local do
      puts "Running E2E tests with VcXserv"
      file = ARGV[1]
      set_envs
      if file
        puts "Running file: #{file}"
        sh("CHROME_DEBUG=true bundle exec rails test #{file}")
      else
        sh("CHROME_DEBUG=true bundle exec rails test:system")
      end
    end
  end
end