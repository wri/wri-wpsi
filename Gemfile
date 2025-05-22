source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.4.2'

# Core gems
gem 'rails', '~> 7.1.3'
gem 'pg', '~> 1.5'
gem 'puma', '~> 6.4.0'
gem 'bootsnap', '>= 1.18.0', require: false
gem 'sprockets-rails'
gem 'importmap-rails'
gem 'turbo-rails'
gem 'stimulus-rails'

# Asset pipeline
gem 'sassc-rails'
gem 'uglifier', '>= 1.3.0'

# Frontend
gem 'bootstrap', '~> 5.3.2'
gem 'jquery-rails'
gem 'clipboard-rails'
gem 'tinymce-rails'

# Authentication & Authorization
gem 'devise', '~> 4.9.3'

# Utilities
gem 'active_storage_validations'
gem 'dotenv-rails'
gem 'slim-rails'
gem 'validate_url'
gem 'sentry-ruby'
gem 'activerecord-import', '~> 1.4'
gem 'csv'

group :development, :test do
  gem 'debug'
  gem 'rspec-rails', '~> 6.1.0'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'brakeman', '>= 6.1.1', require: false
  gem 'bundle-audit', require: false
  gem 'i18n-tasks'
  gem 'simplecov'
  gem 'simplecov-console'
end

group :development do
  gem 'web-console'
  gem 'rack-mini-profiler'
  gem 'listen', '~> 3.8'
  gem 'spring'
  gem 'solargraph', require: false
  gem 'rubocop-rails', require: false
  gem 'slim_lint'
  gem 'rails-erd'
  gem 'overcommit', require: false
end

group :test do
  gem 'capybara', '~> 3.39'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[windows jruby]
