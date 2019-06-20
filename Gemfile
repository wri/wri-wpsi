source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.0'

gem 'bootsnap', '>= 1.1.0', require: false
gem 'dotenv-rails'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.3'
gem 'sass-rails', '~> 5.0'
gem 'sentry-raven'
gem 'slim-rails'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'

group :development, :test do
  gem 'brakeman', require: false
  gem 'bundle-audit', require: false
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'simplecov'
  gem 'simplecov-console'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'overcommit', require: false
  gem 'rubocop-rails', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
end
